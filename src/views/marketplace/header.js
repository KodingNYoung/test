import React from 'react';
import { Button } from '@material-ui/core';
import {
  Card,
  Box,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Chip,
} from '@material-ui/core';
import logo from 'assets/img/brand/logo.svg';
import Search from '@material-ui/icons/Search';
import { Delete } from '@material-ui/icons';

const MarketplaceHeader = ({ setFilter, handleFilteredSearch, nosearch }) => {
  const handleFilters = (e) => {
    if (e.target.textContent.toLowerCase().includes('clear')) setFilter('');
    else setFilter(e.target.textContent);
  };

  return (
    <div>
      <Card>
        <CardHeader
          title={
            <Box display='flex' justifyContent='space-between'>
              <Box
                component='span'
                fontSize='.875rem'
                marginLeft='5rem'
                alignItems='center'
                color='black'
              >
                <img src={logo} alt='logo' />
              </Box>
              <Box
                component='span'
                fontSize='.875rem'
                alignItems='center'
                color='black'
                width='30%'
              >
                <FormControl variant='outlined' fullWidth>
                  <InputLabel htmlFor='outlined-adornment-search-responsive'>
                    Search
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-search-responsive'
                    type='text'
                    endAdornment={
                      <InputAdornment position='end'>
                        <Box
                          component={Search}
                          width='1.25rem!important'
                          height='1.25rem!important'
                        />
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
              </Box>
              {window.screen.width >= '1200' ? (
                <Box
                  component='span'
                  fontSize='.875rem'
                  marginLeft='5rem'
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  color='black'
                >
                  <Button
                    onClick={() => window.open('https://junctionapi.com')}
                    style={{ margin: '0 .5rem' }}
                  >
                    Home
                  </Button>
                  <Button
                    onClick={() => window.open('/auth/login')}
                    style={{ margin: '0 .5rem' }}
                  >
                    Login
                  </Button>

                  <Button
                    style={{
                      background: '#53c6e9',
                      color: '#fff',
                      margin: '0 .5rem',
                    }}
                    onClick={() => window.open('/auth/register')}
                  >
                    Get Started
                  </Button>
                </Box>
              ) : null}
            </Box>
          }
        ></CardHeader>
        {nosearch ? null : (
          <CardContent>
            <Box
              component='span'
              fontSize='.875rem'
              marginLeft='5rem'
              display='flex'
              alignItems='center'
              color='black'
            >
              <Chip
                label='Companies'
                component='a'
                clickable
                onClick={handleFilters}
              />

              <Chip
                label='Freelancers'
                component='a'
                clickable
                onClick={handleFilters}
              />

              <Chip
                label='Country'
                component='a'
                clickable
                onClick={handleFilters}
              />

              <Chip
                label='Location'
                component='a'
                clickable
                onClick={handleFilters}
              />

              <Chip
                label='Rating'
                component='a'
                clickable
                onClick={handleFilters}
              />
              <Chip
                label='Clear Filter'
                deleteIcon={<Delete />}
                onClick={handleFilters}
                clickable={false}
              />
              <Box
                component='span'
                fontSize='.875rem'
                marginLeft='5rem'
                alignItems='center'
              >
                <Button onClick={handleFilteredSearch}>Search</Button>
              </Box>
            </Box>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default MarketplaceHeader;
