import React from 'react';
import MainContainer from 'layouts/MainContainer';
import { Card, Header, Title, SubTitle } from './Home.styles';
import NobelPrizesList from './NobelPrizesList';
// import { getdict } from '../../utils/index';

export default function Home() {
  // var dict;
  // do {
  //   dict = getdict();
  // } while (dict && dict.length <= 0);
  // console.log(dict);
  return (
    <MainContainer>
      <Card>
        <Header>
          <Title>Nobel List</Title>
          <SubTitle>
            Nobel Prizes that have been awarded between 1900 and 2018
          </SubTitle>
        </Header>
        {/* <SubTitle>Peoples won Nobel prize more than 1 time</SubTitle> */}

        <NobelPrizesList />
      </Card>
    </MainContainer>
  );
}
