import React, { useEffect } from 'react';
// core components
import Header from 'components/Headers/PageHeader.js';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

// redux
import { connect } from 'react-redux';
import { getSuccessfulTransactions } from 'store/actions/paymentActions';

const Transaction = (props) => {
  const { getSuccessfulTransactions, successful_transactions } = props;

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    const data = await getSuccessfulTransactions();
  };
  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: '#fff',
          },
        },
      },
    });

  const columns = [
    {
      name: 'id',
      label: 'Transaction ID',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'gateway',
      label: 'Processor',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'source',
      label: 'Source',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'ip',
      label: 'IP',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'date',
      label: 'Date',
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
  };
  return (
    <div>
      <Header />
      <section style={{ marginTop: '-6rem', position: 'relative' }}>
        <div style={{ width: '100%', margin: 'auto', padding: '39px' }}>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={'Completed Transactions'}
              data={successful_transactions}
              columns={columns}
              options={options}
            />
          </MuiThemeProvider>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    successful_transactions: state?.paymentReducers?.successful_transactions,
  };
};

export default connect(mapStateToProps, {
  getSuccessfulTransactions,
})(Transaction);
