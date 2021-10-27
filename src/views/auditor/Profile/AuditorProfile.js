import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  Grid,
  Avatar,
  Button,
  List,
  ListItemSecondaryAction,
  ListItemText,
  ListItem,
  Divider,
  useMediaQuery,
  CardContent,
  CardActionArea,
  CardActions,
  IconButton,
} from '@material-ui/core';
import { Delete, Edit, Add } from '@material-ui/icons';
import { ErrorAlert, SuccessAlert } from 'components/Alert/Alerts';

// modals
import PersonalDetailsModal from './PersonalDetailsModal';
import ContactModal from './ContactModal';
import CertificationModal from './CertificationModal';
import PortfolioModal from './PortfolioModal';
import DeleteModal from './DeleteModal';

// import { logoutAuditor } from 'server/AuditorServer/AuditorServer';
// image
import avatar from '../../../assets/img/brand/avatar.jpg';
import EditModal from './EditModal';

// redux
import { connect } from 'react-redux';
import {
  getOneAuditor,
  updateAuditor,
  uploadFile,
  addCertification,
  addPortfolio,
  deletePortfolio,
  deleteCertification,
  updatePortfolio,
  updateCertification,
} from 'store/actions/auditorActions';
import { logoutAuditor } from 'store/actions/authActions';

const Profile = (props) => {
  const lgScreen = useMediaQuery('(min-width:767px)');
  // styles
  const useStyles = makeStyles((theme) => ({
    root: { margin: `${theme.spacing(2)}px auto`, maxWidth: '90%' },
    title: {
      flexGrow: 1,
      color: '#fff',
    },
    marginBottom: { marginBottom: theme.spacing(1), padding: '0' },
    credentials: { padding: '0' },
    personalDetails: lgScreen
      ? {
          padding: theme.spacing(1),
          flexDirection: 'unset',
        }
      : {
          flexDirection: 'column',
          padding: theme.spacing(2),
          alignItems: 'center',
          textAlign: 'center',
        },
    avatar: {
      minWidth: theme.spacing(20),
      minHeight: theme.spacing(20),
      maxWidth: theme.spacing(25),
      maxHeight: theme.spacing(25),
      width: '30%',
      height: 'auto',
      margin: theme.spacing(2),
    },
    detailsText: {
      margin: lgScreen ? `0 0 0 ${theme.spacing(7)}px` : '0 auto',
      width: lgScreen ? '50%' : '90%',
    },
    name: {
      marginTop: theme.spacing(3),
    },
    about: {
      textAlign: lgScreen ? 'left' : 'justify',
      width: 'fit-content',
      margin: ` ${theme.spacing(1)}px auto`,
    },
    contacts: { padding: theme.spacing(2) },
    contactsListItem: {
      '& .MuiListItemText-secondary': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
      },
    },
    card: { border: '1px solid #ccc' },
    cardActionArea: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: '.9rem',
    },
    cardActions: {
      padding: `.3rem !important`,
    },
    mediaContainer: { width: '100%', height: '150px', textAlign: 'center' },
    media: { height: '100%', width: '100%' },
  }));
  const classes = useStyles();

  // states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalsState, setModalsState] = useState({
    personal: false,
    contact: false,
    certification: false,
    portfolio: false,
    delete: false,
    edit: false,
  });
  const [alert, setAlert] = useState(null);
  const [DPUploading, setDPUploading] = useState(false);
  const [resumeUploading, setResumeUploading] = useState(false);
  const [profileUpdating, setProfileUpdating] = useState(false);
  const [certUpdating, setCertUpdating] = useState(false);
  const [portfolioUpdating, setPortfolioUpdating] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ item: '', id: null });
  const [deleting, setDeleting] = useState(false);
  const [editItem, setEditItem] = useState();
  // refs
  const avatarRef = useRef();
  // props
  const {
    auditor_id,
    getOneAuditor,
    one_auditor,
    logoutAuditor,
    updateAuditor,
    uploadFile,
    addCertification,
    addPortfolio,
    deletePortfolio,
    deleteCertification,
    updatePortfolio,
    updateCertification,
  } = props;

  //function
  useEffect(() => {
    getAuditor();
  }, []);

  const getAuditor = async () => {
    setLoading(true);
    try {
      const res = await getOneAuditor(auditor_id);
      const status = await res.status;
      if (status === 'success') {
        console.log('success');
      } else throw new Error(res.message);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message || err);
      setLoading(false);
    }
  };
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    const url = '/v1/auditor/upload-profile-photo';
    handleFileUpload(file, url, setDPUploading);
    resetFile(avatarRef);
  };
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    const url = '/v1/auditor/upload-resume';
    handleFileUpload(file, url, setResumeUploading);
  };
  const handleFileUpload = async (file, url, loader) => {
    if (file === undefined) {
      setAlert(<ErrorAlert message='Select a valid image' />);
    } else {
      const formData = new FormData();
      formData.append('file', file, file.name);
      loader(true);
      const res = await uploadFile(formData, url);
      if (res.status === 'success') {
        setAlert(<SuccessAlert message={res.message} />);
      } else {
        setAlert(<ErrorAlert message={res.message} />);
      }
      loader(false);
    }

    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  const handleProfileUpdate = async (details) => {
    setProfileUpdating(true);
    const res = await updateAuditor(details, auditor_id);
    if (res.status === 'success') {
      setAlert(<SuccessAlert message={res.message} />);
    } else {
      setAlert(<ErrorAlert message={res.message} />);
    }
    setProfileUpdating(false);
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  const resetFile = (ref) => {
    ref.current.value = '';
  };
  const handleCertificationSubmit = async (data) => {
    setCertUpdating(true);
    const res = await addCertification(data);
    if (res.status === 'success') {
      setAlert(<SuccessAlert message={res.message} />);
    } else {
      setAlert(<ErrorAlert message={res.message} />);
    }
    setCertUpdating(false);
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  const handleCertificationUpdate = async (data, id) => {
    setCertUpdating(true);
    const res = await updateCertification(data, id);
    if (res.status === 'success') {
      setAlert(<SuccessAlert message={res.message} />);
    } else {
      setAlert(<ErrorAlert message={res.message} />);
    }
    setCertUpdating(false);
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  const handlePortfolioSubmit = async (data) => {
    setPortfolioUpdating(true);
    const res = await addPortfolio(data);
    if (res.status === 'success') {
      setAlert(<SuccessAlert message={res.message} />);
    } else {
      setAlert(<ErrorAlert message={res.message} />);
    }
    setPortfolioUpdating(false);
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  const handlePortfolioUpdate = async (data, id) => {
    setPortfolioUpdating(true);
    const res = await updatePortfolio(data, id);
    if (res.status === 'success') {
      setAlert(<SuccessAlert message={res.message} />);
    } else {
      setAlert(<ErrorAlert message={res.message} />);
    }
    setPortfolioUpdating(false);
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  const handleDeletePortfolio = async (id) => {
    setDeleting(true);
    const res = await deletePortfolio(id);
    if (res.status === 'success') {
      setAlert(<SuccessAlert message={res.message} />);
    } else {
      setAlert(<ErrorAlert message={res.message} />);
    }
    setDeleting(false);
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  const handleDeleteCertification = async (id) => {
    setDeleting(true);
    const res = await deleteCertification(id);
    if (res.status === 'success') {
      setAlert(<SuccessAlert message={res.message} />);
    } else {
      setAlert(<ErrorAlert message={res.message} />);
    }
    setDeleting(false);
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  const handleLogout = () => {
    logoutAuditor();
    props.history.push('/auth/login');
  };
  // modals handlers
  const closeModal = (name) => {
    setModalsState({ ...modalsState, [name]: false });
  };
  const openModal = (name) => {
    setModalsState({ ...modalsState, [name]: true });
  };
  const handleDeleteModal = (item, id) => {
    openModal('delete');
    setDeleteItem({ item, id });
  };
  const handleEditModal = (item, data) => {
    openModal('edit');
    setEditItem({ item, data });
  };
  return (
    <>
      {alert && alert}
      <AppBar position='static'>
        <Toolbar style={{ margin: '0 auto', width: '90%', padding: '0' }}>
          <Typography variant='h1' className={classes.title}>
            My Profile
          </Typography>
          <Button
            color='inherit'
            style={{ border: '0' }}
            disableElevation
            onClick={() =>
              props.history.push({
                pathname: '/auditor',
                state: { auditor_id: auditor_id },
              })
            }
          >
            Dashboard
          </Button>
          <Button
            color='inherit'
            style={{ border: '0' }}
            disableElevation
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container disableGutters className={classes.root}>
        {one_auditor?.email ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CardWithIcon
                className={classes.personalDetails}
                icon={<Edit />}
                modalName='personal'
                openModal={openModal}
              >
                <Avatar
                  alt='Remy Sharp'
                  src={one_auditor.profile_photo_url || avatar}
                  className={classes.avatar}
                />
                <div className={classes.detailsText}>
                  <Typography variant='h2' className={classes.name}>
                    {one_auditor.fullname}
                  </Typography>
                  <Typography variant='h4' color='textSecondary'>
                    {one_auditor.company || 'No company'}
                  </Typography>
                  <Typography
                    variant='body1'
                    paragraph
                    className={classes.about}
                    color='textSecondary'
                  >
                    {one_auditor.about || 'No about info'}
                  </Typography>
                  <Button
                    variant='contained'
                    href={one_auditor.resume_url || ''}
                    disabled={one_auditor.resume_url ? false : true}
                    style={{ border: '0' }}
                  >
                    Resume
                  </Button>
                </div>
              </CardWithIcon>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              <CardWithIcon
                icon={<Edit />}
                modalName='contact'
                openModal={openModal}
              >
                <CardContent className={classes.contacts}>
                  <List
                    subheader={
                      <Typography
                        className={classes.contactHeader}
                        variant='h3'
                      >
                        Contact Details
                      </Typography>
                    }
                  >
                    <ListItemComponent tag='Email' value={one_auditor.email} />
                    <Divider />
                    <ListItemComponent
                      tag='Phone'
                      value={one_auditor.phone_number || 'Info not available'}
                    />
                    <Divider />{' '}
                    <ListItemComponent
                      tag='Address'
                      value={one_auditor.address || 'Info not available'}
                    />
                    <Divider />{' '}
                    <ListItemComponent
                      tag='Location'
                      value={one_auditor.location || 'Info not available'}
                    />
                    <Divider />{' '}
                    <ListItemComponent
                      tag='Country'
                      value={one_auditor.country || 'Info not available'}
                    />
                    <Divider />{' '}
                    <ListItemComponent
                      tag='Facebook'
                      value={one_auditor.facebook || 'Info not available'}
                    />
                    <Divider />{' '}
                    <ListItemComponent
                      tag='linkedin'
                      value={one_auditor.linkedin || 'Info not available'}
                    />
                  </List>
                </CardContent>
              </CardWithIcon>
            </Grid>
            <Grid container item xs={12} md={7} lg={8}>
              <Grid item xs={12} className={classes.marginBottom}>
                <CardWithIcon
                  icon={<Add />}
                  modalName='certification'
                  openModal={openModal}
                >
                  <CardContent>
                    <Typography variant='h3' component='h2'>
                      Licenses and Certifications
                    </Typography>
                    <List
                      sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                      }}
                    >
                      {one_auditor?.license_and_certs[0] ? (
                        one_auditor.license_and_certs.map((cert, index) => (
                          <div key={index}>
                            <ListItem key={index}>
                              <ListItemText
                                primary={cert.name}
                                secondary={
                                  <>
                                    <Typography
                                      gutterBottom={false}
                                      variant='body1'
                                      component='span'
                                    >
                                      {cert.organization}
                                    </Typography>
                                    <Typography
                                      gutterBottom={false}
                                      component='small'
                                      style={{ fontSize: '.8rem' }}
                                    >
                                      {new Date(
                                        cert.issue_date
                                      ).toLocaleDateString()}{' '}
                                      -{' '}
                                      {new Date(
                                        cert.exp_date
                                      ).toLocaleDateString()}
                                    </Typography>
                                  </>
                                }
                                className={classes.contactsListItem}
                              />
                              <ListItemSecondaryAction>
                                <IconButton
                                  edge='end'
                                  aria-label='delete'
                                  onClick={() =>
                                    handleEditModal('Certification', cert)
                                  }
                                >
                                  <Edit />
                                </IconButton>
                                <IconButton
                                  edge='end'
                                  aria-label='delete'
                                  onClick={() => {
                                    openModal('delete');
                                    handleDeleteModal('Certification', cert.id);
                                  }}
                                >
                                  <Delete />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                            {one_auditor.license_and_certs.length - 1 ===
                            index ? null : (
                              <Divider />
                            )}
                          </div>
                        ))
                      ) : (
                        <Typography variant='h5' component='h2'>
                          No License or certifcation available
                        </Typography>
                      )}
                    </List>
                  </CardContent>
                </CardWithIcon>
              </Grid>
              <Grid item xs={12} className={classes.marginBottom}>
                <CardWithIcon
                  icon={<Add />}
                  modalName='portfolio'
                  openModal={openModal}
                >
                  <CardContent>
                    <Typography variant='h3' component='h2'>
                      Customers and Portfolio
                    </Typography>
                    <Grid container spacing={1}>
                      {one_auditor.portfolios[0] ? (
                        one_auditor.portfolios.map((portfolio, index) => (
                          <Grid item xs={3} lg={4} key={index}>
                            <Card variant='outlined' className={classes.card}>
                              <CardActionArea
                                className={classes.cardActionArea}
                              >
                                <div className={classes.mediaContainer}>
                                  <img
                                    src={
                                      portfolio?.logo_url ||
                                      'https://www.cloudcorner.gr/wp-content/uploads/2019/03/microsoft-certified-azure-solutions-architect-expert-600x420.png'
                                    }
                                    className={classes.media}
                                  />
                                </div>
                                <Typography
                                  variant='h4'
                                  component='h2'
                                  style={{ padding: '.5rem', margin: 0 }}
                                >
                                  {portfolio.title}
                                </Typography>
                              </CardActionArea>
                              <CardActions className={classes.cardActions}>
                                <IconButton
                                  aria-label='edit'
                                  fontSize='large'
                                  onClick={() =>
                                    handleEditModal('portfolio', portfolio)
                                  }
                                >
                                  <Edit fontSize='large' />
                                </IconButton>
                                <IconButton
                                  aria-label='delete'
                                  onClick={() =>
                                    handleDeleteModal('Portfolio', portfolio.id)
                                  }
                                >
                                  <Delete fontSize='large' />
                                </IconButton>
                              </CardActions>
                            </Card>
                          </Grid>
                        ))
                      ) : (
                        <Typography variant='h5' component='h2'>
                          No portfolio project available
                        </Typography>
                      )}
                    </Grid>
                  </CardContent>
                </CardWithIcon>
              </Grid>
            </Grid>
          </Grid>
        ) : loading ? (
          <Typography>Loading..</Typography>
        ) : (
          <Typography>{error || `Couldn't get auditor data`}</Typography>
        )}
      </Container>

      {modalsState.personal && (
        <PersonalDetailsModal
          open={modalsState.personal}
          closeModal={closeModal}
          auditor={one_auditor}
          avatarRef={avatarRef}
          handleAvatarUpload={handleAvatarUpload}
          DPUploading={DPUploading}
          handleResumeUpload={handleResumeUpload}
          resumeUploading={resumeUploading}
          updateProfile={handleProfileUpdate}
          profileUpdating={profileUpdating}
        />
      )}
      {modalsState.contact && (
        <ContactModal
          open={modalsState.contact}
          closeModal={closeModal}
          auditor={one_auditor}
          updateProfile={handleProfileUpdate}
          profileUpdating={profileUpdating}
        />
      )}
      {modalsState.certification && (
        <CertificationModal
          open={modalsState.certification}
          closeModal={closeModal}
          handleCertificationSubmit={handleCertificationSubmit}
          certUpdating={certUpdating}
          mode='Add'
        />
      )}
      {modalsState.portfolio && (
        <PortfolioModal
          open={modalsState.portfolio}
          closeModal={closeModal}
          handlePortfolioSubmit={handlePortfolioSubmit}
          portfolioUpdating={portfolioUpdating}
          mode='Add'
        />
      )}
      {modalsState.delete && (
        <DeleteModal
          open={modalsState.delete}
          closeModal={closeModal}
          item={deleteItem}
          handleDeletePortfolio={handleDeletePortfolio}
          handleDeleteCertification={handleDeleteCertification}
          deleting={deleting}
        />
      )}
      {modalsState.edit && (
        <EditModal
          open={modalsState.edit}
          closeModal={closeModal}
          item={editItem}
          handlePortfolioUpdate={handlePortfolioUpdate}
          portfolioUpdating={portfolioUpdating}
          handleCertificationUpdate={handleCertificationUpdate}
          certUpdating={certUpdating}
        />
      )}
    </>
  );
};

const ListItemComponent = ({ tag, value }) => {
  const useStyles = makeStyles((theme) => ({
    list: { padding: theme.spacing(1) },
    listValue: { fontSize: '.8rem', maxWidth: '50%', textAlign: 'right' },
    listTag: { fontSize: '.9rem ', '& > *': { fontSize: '0.9rem' } },
  }));
  const classes = useStyles();
  return (
    <ListItem className={classes.list}>
      <ListItemText primary={tag} className={classes.listTag} />
      <ListItemSecondaryAction className={classes.listValue}>
        {value}
      </ListItemSecondaryAction>
    </ListItem>
  );
};
const CardWithIcon = ({ children, icon, modalName, openModal, ...props }) => {
  const useStyles = makeStyles((theme) => ({
    icon: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
      fontSize: '1rem',
      zIndex: '1',
    },
  }));
  const classes = useStyles();
  return (
    <Card {...props}>
      <IconButton className={classes.icon} onClick={() => openModal(modalName)}>
        {icon}
      </IconButton>
      {children}
    </Card>
  );
};
const mapStateToProps = (state) => {
  return {
    auditor_id: state?.authReducers?.auditor_id,
    one_auditor: state?.auditorReducers?.one_auditor,
  };
};

export default connect(mapStateToProps, {
  getOneAuditor,
  updateAuditor,
  uploadFile,
  addCertification,
  addPortfolio,
  deletePortfolio,
  deleteCertification,
  updatePortfolio,
  updateCertification,
  logoutAuditor,
})(Profile);
