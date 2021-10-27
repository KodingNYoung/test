import React, { useState, useEffect } from 'react';
import MarketplaceContent from './content';
import MarketPlaceSingle from './viewOne';

// redux
import { connect } from 'react-redux';
import { getAllAuditors } from 'store/actions/auditorActions';
// route
import { Switch, Route } from 'react-router-dom';

const Marketplace = (props) => {
  const [auditorId, setAuditorId] = useState(0);
  const [filter, setFilter] = useState([]);
  const [auditor, setAuditor] = useState({});
  const [loading, setLoading] = useState(true);
  const { getAllAuditors, all_auditors } = props;

  useEffect(() => {
    getAuditors();
  }, []);

  useEffect(() => {
    const selectedAuditor = getAuditorById(auditorId);

    setAuditor(selectedAuditor);
  }, [auditorId]);

  const getAuditors = async () => {
    setLoading(true);
    const res = await getAllAuditors();
    console.log(res);
    setLoading(false);
  };
  const getAuditorById = (id) => {
    return all_auditors?.filter((auditor) => auditor.id === id)[0];
  };

  const viewAuditorPage = (id) => {
    setAuditorId(id);
    props.history.push('/marketplace/auditor');
  };

  const handleFilteredSearch = () => {
    console.log(filter);
  };

  return (
    <>
      <Switch>
        <Route
          path='/marketplace'
          render={(props) => (
            <MarketplaceContent
              {...props}
              viewAuditorPage={viewAuditorPage}
              allAuditors={all_auditors}
              setFilter={setFilter}
              handleFilteredSearch={handleFilteredSearch}
              loading={loading}
            />
          )}
          exact
        />
        <Route
          path='/marketplace/auditor'
          render={(props) => (
            <MarketPlaceSingle {...props} auditor={auditor} loading={loading} />
          )}
        />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    all_auditors: state?.auditorReducers?.all_auditors,
  };
};

export default connect(mapStateToProps, { getAllAuditors })(Marketplace);
