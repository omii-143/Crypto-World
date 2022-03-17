import React, { useState } from 'react';
import { Typography, Row, Col, Avatar, Collapse } from 'antd';
import { useGetCryptoDetailsQuery, useGetCryptosQuery } from '../services/cryptoApi';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import Loader from './Loader';


const { Text } = Typography;
const { Panel } = Collapse;
const Exchanges = () => {

  const [coinId, setCoinId] = useState('Qwsogvtv82FCd');
  const { data: cryptoList, isFetching } = useGetCryptosQuery(50);
  const currency = cryptoList?.data?.coins
  const { data } = useGetCryptoDetailsQuery(coinId);
  const details = data?.data?.coin;

  if (isFetching) return <Loader />;
  
  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>Price</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      {currency?.map((exchange, i) => (
        <Row>
          <Col span={24} onClick={() => setCoinId(exchange?.uuid)}>
            <Collapse>
              <Panel
                key={exchange?.uuid}
                showArrow={false}
                header={(
                  <Row style={{width: '100%'}} key={i}>
                      <Col span={6}>
                        <Text><strong>{exchange?.rank}.</strong></Text>
                        <Avatar className="exchange-image" src={exchange?.iconUrl} />
                        <Text><strong>{exchange?.name}</strong></Text>
                      </Col>
                      <Col span={6}>${millify(exchange?.price)}</Col>
                      <Col span={6}>{millify(exchange?.marketCap)}</Col>
                      <Col span={6}>{millify(exchange?.change)}%</Col>
                  </Row>
                )}
              >
                {HTMLReactParser(details?.description || '')}
              </Panel>
            </Collapse>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default Exchanges;