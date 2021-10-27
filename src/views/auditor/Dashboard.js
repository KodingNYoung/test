import React, { useEffect } from 'react';
// core components
import { Button, Container } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

// redux
import { connect } from 'react-redux';
import { getAuditorMerchants } from 'store/actions/auditorActions';

const Dashboard = (props) => {
  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: '#fff',
            minWidth: '200px',
            // width: '100%',
            // padding: '2% 2%',
            // textAlign: 'center'
          },
        },
      },
    });

  const { getAuditorMerchants, auditor_merchants } = props;

  useEffect(() => {
    getAllMerchants();
  }, []);
  const columns = [
    {
      name: 'business_name',
      label: 'Business Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'fullname',
      label: 'Merchant Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'email',
      label: 'Marchant Email',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'phone_number',
      label: 'Phone Number',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'date',
      label: 'View',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, table) => (
          <Button
            variant='contained'
            type='button'
            style={{ margin: 8 }}
            onClick={() =>
              props.history.push(
                `/auditor/merchant/${auditor_merchants[table.rowIndex].id}`
              )
            }
          >
            View Merchant
          </Button>
        ),
      },
    },
  ];

  const getAllMerchants = async () => {
    await getAuditorMerchants();
  };

  const options = {
    filterType: 'dropdown',
    selectableRows: 'none',
  };
  return (
    <div>
      <section style={{ marginTop: '-6rem', position: 'relative' }}>
        <Container maxWidth='lg'>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={'Your Merchants'}
              data={auditor_merchants}
              columns={columns}
              options={options}
            />
          </MuiThemeProvider>
        </Container>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auditor_merchants: state?.auditorReducers?.auditor_merchants,
  };
};

export default connect(mapStateToProps, { getAuditorMerchants })(Dashboard);
