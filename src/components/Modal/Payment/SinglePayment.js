import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  // TextField,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Close from '@material-ui/icons/Close';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';
import Loader from 'react-loader-spinner';

// redux
import { connect } from 'react-redux';
import {
  getMerchantProfile,
  uploadLogo,
  updateMerchantProfile,
} from 'store/actions/merchantActions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  preheading: {
    borderBottom: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
}));

const stepOne = (domain, error) => {
  return (
    <div>
      <h1>Confirm your domain name!</h1>
      <p>
        The first step to setting up your own payment page is by setting up your
        own name and it has been set as '{domain}'
      </p>
    </div>
  );
};
const stepTwo = (fileInput, handleFileUpload, file, error) => {
  return (
    <div>
      <h1>Upload your logo!</h1>
      <p>Impress your customers with your own brand!</p>

      <form>
        <input
          ref={fileInput}
          onChange={handleFileUpload}
          type='file'
          style={{ display: 'none' }}
          required
        />
        <Button
          onClick={() => fileInput.current.click()}
          type='button'
          style={{ width: '100%' }}
        >
          Upload File
        </Button>
        <p>{file ? file.name : null}</p>
        <p>{error ? 'Logo is required' : null}</p>
      </form>
    </div>
  );
};
const stepThree = (color, setColor) => {
  return (
    <div>
      <h1>Select your color!</h1>
      <p>Own your brand with your own colors!</p>
      <ColorPicker
        width={456}
        height={228}
        color={color}
        onChange={setColor}
        hideHSV
        dark
      />
    </div>
  );
};
function getSteps() {
  return ['Domain settings', 'Logo upload', 'Theme setting'];
}

function getStepContent(
  step,
  fileInput,
  handleFileUpload,
  file,
  color,
  setColor,
  domain,
  error
) {
  switch (step) {
    case 0:
      return stepOne(domain, error);
    case 1:
      return stepTwo(fileInput, handleFileUpload, file);
    case 2:
      return stepThree(color, setColor);
    default:
      return 'Unknown step';
  }
}

function SinglePayment(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [file, setFile] = useState('');
  const [color, setColor] = useColor('hex', '#121212');
  const steps = getSteps();
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState('');
  const [error, setError] = useState(false);

  const {
    uploadLogo,
    updateMerchantProfile,
    getMerchantProfile,
    merchant_subdomain,
    closeModal,
  } = props;

  useEffect(() => {
    let setProfile = async () => {
      await getMerchantProfile();
    };
    setProfile();
  }, []);
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };
  const fileInput = useRef(null);
  const isStepOptional = (step) => {
    return step === '';
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    if ((activeStep === 0) & (merchant_subdomain === '')) {
      setError(true);
      return;
    }
    if ((activeStep === 1) & (file === '')) {
      setError(true);
      return;
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    await setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('file', file);
      const data = { bkg_color: color.hex };
      await updateMerchantProfile(data);
      await uploadLogo(formdata);
      setLoading(false);
    }
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  return (
    <div className={classes.root}>
      <div className={classes.preheading}>
        <Box
          component={Close}
          width='1.5rem!important'
          height='1.5rem!important'
          color='red'
          margin='.5rem'
          onClick={closeModal}
        />
      </div>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant='caption'>Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {/* final step */}
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            {loading ? (
              <div style={{ margin: 'auto', width: '50%' }}>
                <Loader
                  type='Puff'
                  color='#53c6e9'
                  height={100}
                  width={100}
                  timeout={3000} //3 secs
                />
              </div>
            ) : (
              <div>
                <p>Your payment page is all set!</p>
                <p>http://app.junctionapi.com/merchant/{merchant_subdomain}</p>
              </div>
            )}
            {/* <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button> */}
          </div>
        ) : (
          <div>
            <Typography component='div' className={classes.instructions}>
              {getStepContent(
                activeStep,
                fileInput,
                handleFileUpload,
                file,
                color,
                setColor,
                merchant_subdomain,
                error
              )}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant='contained'
                  color='default'
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant='contained'
                color='default'
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    merchant_subdomain: state?.merchantReducers?.merchant_subdomain,
  };
};

export default connect(mapStateToProps, {
  getMerchantProfile,
  uploadLogo,
  updateMerchantProfile,
})(SinglePayment);
