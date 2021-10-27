import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import componentStyles from "assets/theme/layouts/auth.js";
import SinglePage from "views/Payment/singlePage";
import theme from "assets/theme/theme";
import NotFound from "views/Payment/notFound";

const getPreference = () => {
    //axios get merchant preference
    const bg = localStorage.getItem("bgColor")
    const color = "black"
    const logo = "https://freepngimg.com/thumb/pepsi_logo/32185-4-pepsi-logo-clipart-thumb.png"
    const businessName = localStorage.getItem('business')
    return {
        bg, color, logo, businessName
    }
}
const loadUI = () => {
    return getPreference()['bg']
}


const useStyles = makeStyles(componentStyles(theme, loadUI()));

const PaymentLayout = (props) => {
  const classes = useStyles();
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    if (loadUI()=== null) {
      document.body.classList.add(classes.bgDefault);
      return () => {
        document.body.classList.remove(classes.bgDefault);
      };
    } else {
    }
    document.body.classList.add(classes.bgCustom);
    return () => {
      document.body.classList.remove(classes.bgCustom);
    };
  }, [localStorage.getItem
  ('bgColor')]);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <Container
          component={Box}
          maxWidth="xl"
          marginTop="8rem"
          paddingBottom="3rem"
          position="relative"
          zIndex="101"
        >
          <Box component={Grid} container justifyContent="center">
            <Switch>
            <Route
                path="/merchant/notfound"
                render={(props) => <NotFound {...props} />}
              />
              <Route
                path="/merchant/:id"
                render={(props) => <SinglePage {...props} preference={getPreference()} />}
              />
              <Redirect from="*" to="/merchant/notfound" />
            </Switch>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default PaymentLayout;
