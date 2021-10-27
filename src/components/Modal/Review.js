import React, { useState, useRef, useEffect } from 'react';
import { ErrorAlert, SuccessAlert } from 'components/Alert/Alerts';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FilledInput,
  FormControl,
  FormGroup,
  Grid,
  FormLabel,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Skeleton from '@material-ui/lab/Skeleton';
// @material-ui/icons components
// core components

import componentStyles from 'assets/theme/views/admin/profile.js';
import 'index.css';

// redux
import { connect } from 'react-redux';
import {
  getOnePolicy,
  getOneEvidence,
  getPolicyVersions,
  getEvidenceVersions,
  approvePolicy,
  approveEvidence,
  postPolicyVersion,
  postEvidenceVersion,
  postPolicyComment,
  postEvidenceComment,
  deletePolicy,
  deleteEvidence,
} from 'store/actions/merchantActions';

const useStyles = makeStyles(componentStyles, {
  root: {
    width: 300,
  },
});

function Review(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [upload, setUpload] = useState(false);
  const [respond, setRespond] = useState(false);
  const [file, setFile] = useState();
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState('');
  const [status, setStatus] = useState('pending');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState({
    content: false,
    approve: false,
    version: false,
    comment: false,
    delete: false,
  });
  const {
    getOnePolicy,
    getOneEvidence,
    getPolicyVersions,
    getEvidenceVersions,
    approvePolicy,
    approveEvidence,
    postPolicyVersion,
    postEvidenceVersion,
    postPolicyComment,
    postEvidenceComment,
    deletePolicy,
    deleteEvidence,
    one_policy,
    one_evidence,
    policy_versions,
    evidence_versions,
  } = props;

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (props.type === 'Policy') {
      setComments(one_policy.comments);
      setStatus(one_policy.status);
      setDocuments(policy_versions);
    } else if (props.type === 'Evidence') {
      setComments(one_evidence.comments);
      setStatus(one_evidence.status);
      setDocuments(evidence_versions);
    }
  }, [one_policy, one_evidence, evidence_versions, policy_versions]);
  const getData = async () => {
    let data, version;
    setLoading({ ...loading, content: true });
    if (props.type === 'Policy') {
      data = await getOnePolicy(props.id);
      version = await getPolicyVersions(props.id);
    }
    if (props.type === 'Evidence') {
      data = await getOneEvidence(props.id);
      version = await getEvidenceVersions(props.id);
    }
    setLoading({ ...loading, content: false });
    const responses = [data, version];

    Promise.all(responses)
      .then(() => {
        responses.forEach((response) => {
          if (response.status !== 'success') {
            throw new Error(response.message);
          }
        });
      })
      .catch((err) => {
        setAlert(<ErrorAlert message={err.message} />);
        setTimeout(() => {
          setAlert(null);
          props.setOpen(false);
        }, 3000);
      });
  };
  const approveCompliance = async () => {
    setLoading({ ...loading, approve: true });
    let res;
    if (props.type === 'Policy') {
      res = await approvePolicy(props.id);
    }
    if (props.type === 'Evidence') {
      res = await approveEvidence(props.id);
    }

    if (res.status === 'success') {
      setAlert(<SuccessAlert message={res.message} />);
    } else {
      setAlert(<ErrorAlert message={res.message} />);
    }
    await getData();
    setLoading({ ...loading, approve: false });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  const uploadDocument = async () => {
    setLoading({ ...loading, version: true });
    const formData = new FormData();
    formData.append('file', file, file.name);
    let res;
    if (props.type === 'Policy') {
      res = await postPolicyVersion(formData, props.id);
    }
    if (props.type === 'Evidence') {
      res = await postEvidenceVersion(formData, props.id);
    }
    if (res.status === 'success') {
      setAlert(<SuccessAlert message={res.message} />);
      fileInput.current.value = '';
      setFile(null);
    } else {
      setAlert(<ErrorAlert message={res.message} />);
    }
    setLoading({ ...loading, version: false });
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };
  const fileInput = useRef(null);
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, comment: true });
    let post;
    if (props.type === 'Policy') {
      post = await postPolicyComment(
        {
          comment: message,
        },
        props.id
      );
    }
    if (props.type === 'Evidence') {
      post = await postEvidenceComment(
        {
          comment: message,
        },
        props.id
      );
    }
    if (post.status === 'success') {
      setMessage('');
      setAlert(<SuccessAlert message={post.message} />);
    } else {
      setAlert(<ErrorAlert message={post.message} />);
    }
    getData();
    setLoading({ ...loading, comment: false });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const deleteCompliance = async () => {
    setLoading({ ...loading, delete: true });
    let res;
    if (props.type === 'Policy') {
      res = await deletePolicy(props.id);
    }
    if (props.type === 'Evidence') {
      res = await deleteEvidence(props.id);
    }

    setLoading({ ...loading, delete: false });
    if (res.status === 'success') {
      setAlert(<SuccessAlert message={res.message} />);
    } else {
      setAlert(<ErrorAlert message={res.message} />);
    }
    setTimeout(() => {
      setAlert(null);
      if (res.status === 'success') {
        props.setOpen(false);
      }
    }, 3000);
  };

  return (
    <>
      {alert && alert}
      <h2 id='simple-modal-title'>View {props.type}</h2>

      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        // marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        {!loading.content ? (
          <Grid container>
            <Grid
              item
              xs={12}
              xl={12}
              component={Box}
              marginBottom='3rem'
              classes={{ root: classes.gridItemRoot + ' ' + classes.order2 }}
            >
              <Card
                classes={{
                  root: classes.cardRoot + ' ' + classes.cardRootSecondary,
                }}
              >
                <CardHeader
                  subheader={
                    <Grid
                      container
                      component={Box}
                      alignItems='center'
                      justifyContent='space-between'
                    >
                      <Grid item xs='auto'>
                        <Box
                          component={Typography}
                          variant='h3'
                          marginBottom='0!important'
                        >
                          {props.title}
                        </Box>
                      </Grid>
                      <Grid item xs='auto'>
                        <Box
                          justifyContent='flex-end'
                          display='flex'
                          flexWrap='wrap'
                        >
                          <Button
                            variant='contained'
                            color='default'
                            size='medium'
                            onClick={() => window.open(props.btnurl, '_blank')}
                          >
                            Download {props.type}
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  }
                  classes={{ root: classes.cardHeaderRoot }}
                ></CardHeader>
                <CardContent>
                  <Box
                    component={Typography}
                    variant='h6'
                    color={theme.palette.gray[600] + '!important'}
                    paddingTop='.25rem'
                    paddingBottom='.25rem'
                    fontSize='.75rem!important'
                    letterSpacing='.04em'
                    marginBottom='1.5rem!important'
                    classes={{ root: classes.typographyRootH6 }}
                  >
                    Policy Description
                  </Box>
                  <div className={classes.plLg2}>
                    <Grid container>
                      <Typography>{props.description}</Typography>
                    </Grid>
                  </div>
                  {/* VERSIONS */}
                  <Box
                    component={Typography}
                    variant='h6'
                    color={theme.palette.gray[600] + '!important'}
                    paddingTop='.25rem'
                    paddingBottom='.25rem'
                    fontSize='.75rem!important'
                    letterSpacing='.04em'
                    marginBottom='1.5rem!important'
                    marginTop='1.5rem!important'
                    classes={{ root: classes.typographyRootH6 }}
                  >
                    Version History
                    <Tooltip title='Click to upload new version'>
                      <IconButton
                        aria-label='add'
                        className={classes.mlLg4 + ' ' + classes.addButton}
                        onClick={() => setUpload(!upload)}
                      >
                        {upload ? <RemoveIcon /> : <AddIcon />}
                      </IconButton>
                    </Tooltip>
                  </Box>
                  {upload ? (
                    <div>
                      <input
                        ref={fileInput}
                        onChange={handleFileUpload}
                        type='file'
                        style={{ display: 'none' }}
                      />
                      <Button
                        onClick={() => fileInput.current.click()}
                        type='button'
                        style={{ width: '100%' }}
                      >
                        Upload File
                      </Button>
                      <Grid container>
                        <Grid item xs={12} lg={6}>
                          <p>{file ? file.name : null}</p>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          {loading.version ? (
                            <div className={classes.root}>
                              <Skeleton />
                              <Skeleton animation={false} />
                              <Skeleton animation='wave' />
                            </div>
                          ) : (
                            <Button
                              variant='contained'
                              type='button'
                              style={{ float: 'right', margin: 8 }}
                              className={classes.addButton}
                              onClick={uploadDocument}
                            >
                              Create
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  ) : null}

                  <div>
                    {documents
                      ? documents.map((document, index) => (
                          <Grid container key={index}>
                            <Grid item xs={12} lg={6}>
                              <FormGroup>
                                <FormLabel>Date Uploaded</FormLabel>
                                <FormControl
                                  variant='filled'
                                  component={Box}
                                  width='100%'
                                  marginBottom='1rem!important'
                                >
                                  <Box
                                    paddingLeft='0.75rem'
                                    paddingRight='0.75rem'
                                    component={FilledInput}
                                    autoComplete='off'
                                    type='text'
                                    disabled
                                    aria-readonly
                                    value={document?.date_uploaded}
                                  />
                                </FormControl>
                              </FormGroup>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                              <FormGroup>
                                <FormLabel>Download</FormLabel>
                                <FormControl
                                  variant='filled'
                                  component={Box}
                                  width='100%'
                                  marginBottom='1rem!important'
                                >
                                  <Button
                                    variant='contained'
                                    size='medium'
                                    color='default'
                                    className={classes.margin}
                                    onClick={() =>
                                      window.open(document?.file_url, '_blank')
                                    }
                                  >
                                    Click Here to Download Version
                                  </Button>
                                </FormControl>
                              </FormGroup>
                            </Grid>
                          </Grid>
                        ))
                      : null}
                  </div>
                  <Box
                    component={Divider}
                    marginBottom='1.5rem!important'
                    marginTop='1.5rem!important'
                  />
                  {/* COMMENTS */}
                  <Box
                    component={Typography}
                    variant='h6'
                    color={theme.palette.gray[600] + '!important'}
                    paddingTop='.25rem'
                    paddingBottom='.25rem'
                    fontSize='.75rem!important'
                    letterSpacing='.04em'
                    marginBottom='1.5rem!important'
                    classes={{ root: classes.typographyRootH6 }}
                  >
                    Comments
                    <Tooltip title='Click to post comment'>
                      <IconButton
                        aria-label='add'
                        className={classes.mlLg4 + ' ' + classes.addButton}
                        onClick={() => setRespond(!respond)}
                      >
                        {respond ? <RemoveIcon /> : <AddIcon />}
                      </IconButton>
                    </Tooltip>
                  </Box>
                  {respond ? (
                    <FormGroup>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl
                        variant='filled'
                        component={Box}
                        width='100%'
                        marginBottom='1rem!important'
                      >
                        <div
                          style={{
                            textAlign: 'left',
                          }}
                        >
                          <Box
                            paddingLeft='0.75rem'
                            paddingRight='0.75rem'
                            component={FilledInput}
                            autoComplete='off'
                            multiline
                            placeholder='Enter your message here'
                            rows='2'
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                          />
                        </div>
                      </FormControl>
                      <Grid container>
                        <Grid item xs={12} lg={6}>
                          {loading.comment ? (
                            <div className={classes.root}>
                              <Skeleton />
                              <Skeleton animation={false} />
                              <Skeleton animation='wave' />
                            </div>
                          ) : (
                            <Button
                              variant='contained'
                              type='submit'
                              style={{ float: 'right' }}
                              className={classes.addButton}
                              onClick={handleSubmit}
                            >
                              Send
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </FormGroup>
                  ) : null}
                  <div
                    className={classes.plLg4}
                    style={{
                      maxHeight: '300px',
                      overflowY: 'scroll',
                      overflowX: 'hidden',
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <FormGroup>
                          {comments.length !== 0
                            ? comments.map((item) => (
                                <div
                                  key={item.id}
                                  style={{
                                    background: '#f0f0f0',
                                    padding: '1rem',
                                    borderRadius: '5px',
                                    margin: '.5rem',
                                  }}
                                >
                                  <FormLabel
                                    style={{
                                      color: item.merchantName
                                        ? '#172b4d'
                                        : '#2dce89',
                                    }}
                                  >
                                    {item.merchantName
                                      ? item.merchantName
                                      : item.auditorName}
                                  </FormLabel>
                                  <FormControl component={Box} width='100%'>
                                    <div
                                      style={{
                                        color: item.merchantName
                                          ? '#172b4d'
                                          : '#2dce89',
                                      }}
                                    >
                                      <Typography>{item.comment}</Typography>

                                      <Typography
                                        style={{ textAlign: 'right' }}
                                        variant='h5'
                                      >
                                        {item.timestamp}
                                      </Typography>
                                    </div>
                                  </FormControl>
                                </div>
                              ))
                            : null}
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item container xs={12} style={{ padding: '.8rem' }}>
              <Grid item xs={12} lg={6}>
                <Button
                  variant='contained'
                  size='large'
                  color='secondary'
                  className={classes.buttonContainedError}
                  onClick={deleteCompliance}
                  disabled={loading.delete}
                  style={{ border: 0 }}
                >
                  {loading.delete ? 'Deleting' : 'Delete'}
                </Button>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Button
                  variant='contained'
                  size='large'
                  color='default'
                  className={classes.margin}
                  style={{ float: 'right', border: 0 }}
                  onClick={approveCompliance}
                  disabled={
                    status === 'approved' || loading.approve ? true : false
                  }
                >
                  {status === 'approved'
                    ? 'Approved'
                    : loading.approve
                    ? 'Approving'
                    : 'Approve'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          'Loading...'
        )}
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    one_policy: state?.merchantReducers?.one_policy,
    one_evidence: state?.merchantReducers?.one_evidence,
    policy_versions: state?.merchantReducers?.policy_versions,
    evidence_versions: state?.merchantReducers?.evidence_versions,
  };
};

export default connect(mapStateToProps, {
  getOnePolicy,
  getOneEvidence,
  getPolicyVersions,
  getEvidenceVersions,
  approvePolicy,
  approveEvidence,
  postPolicyVersion,
  postEvidenceVersion,
  postPolicyComment,
  postEvidenceComment,
  deletePolicy,
  deleteEvidence,
})(Review);
