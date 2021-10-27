import React, { useState, useEffect } from 'react';

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
  postPolicyComment,
  postEvidenceComment,
} from 'store/actions/merchantActions';

const useStyles = makeStyles(componentStyles, {
  root: {
    width: 300,
  },
});

function Review(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [respond, setRespond] = useState(false);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState('');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState({
    content: false,
    comment: false,
  });

  const {
    getOnePolicy,
    getOneEvidence,
    getPolicyVersions,
    getEvidenceVersions,
    postPolicyComment,
    postEvidenceComment,
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
      setDocuments(policy_versions);
    } else if (props.type === 'Evidence') {
      setComments(one_evidence.comments);
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
                </Box>

                <div>
                  {documents
                    ? documents.map((document, key) => (
                        <Grid container key={key}>
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
                                  value={document.date_uploaded}
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
                                    window.open(document.file_url, '_blank')
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
                            style={{ float: 'right', margin: 8 }}
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
        </Grid>
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
  postPolicyComment,
  postEvidenceComment,
})(Review);
