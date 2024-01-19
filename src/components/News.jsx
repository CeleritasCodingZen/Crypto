import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Input } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

const { Text, Title } = Typography;

const News = ({ simplified }) => {
  const { data, isFetching } = useGetCryptoNewsQuery();                  
  const [cryptoNews, setCryptoNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (data && data.data) {
      setCryptoNews(data.data.slice(0, simplified ? 12 : 27));

      const filteredData = data.data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm)
      );

      setCryptoNews(filteredData.slice(0, simplified ? 12 : 27));
    }
  }, [data, searchTerm, simplified]);

  if (isFetching) {
    return <Loader/>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      {!simplified && (
        <div className="select-news"> 
          <Input
            placeholder="Search News"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[24, 24]}>
        {cryptoNews.map((news, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card
              hoverable
              className="news-card"
              cover={<img alt="news" src={news.thumbnail || ''} />}
            >
              <a href={news.url} target="_blank" rel="noopener noreferrer">
                <div className="news-content">
                  <Title level={4}>{news.title}</Title>
                  <Text>{news.description}</Text>
                  <div className="provider-container">
                    <Text>{moment(news.createdAt).startOf('ss').fromNow()}</Text>
                  </div>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
