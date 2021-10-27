import React, { useEffect, useState } from 'react';
// core components
import Header from 'components/Headers/PageHeader.js';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

// redux
import { connect } from 'react-redux';
import { getAllTransactions } from 'store/actions/paymentActions';

const Records = (props) => {
  const [records, setRecords] = useState([]);

  const { all_transactions, getAllTransactions } = props;
  useEffect(() => {
    const getTransaction = async () => {
      await getAllTransactions();
      try {
        const newRecords = all_transactions.map((record) => {
          let { status, gateway } = record;
          status = capitalizeString(status);
          gateway = capitalizeString(gateway);
          return { ...record, status, gateway };
        });
        setRecords(newRecords);
      } catch {
        setRecords([]);
      }
    };

    getTransaction();
  }, []);
  const capitalizeString = (str) => {
    let string = str.toLowerCase();
    return str.charAt(0).toUpperCase() + string.slice(1);
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
    selectableRows: 'none',
  };
  return (
    <div>
      <Header />
      <section style={{ marginTop: '-6rem', position: 'relative' }}>
        <div
          style={{
            width: '100%',
            margin: 'auto',
            padding: '39px',
            // textTransform: 'capitalize',
          }}
        >
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={'Transactions Records'}
              data={records}
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
    all_transactions: state?.paymentReducers?.all_transactions,
  };
};

export default connect(mapStateToProps, {
  getAllTransactions,
})(Records);
