import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  List,
  Starred,
  Info,
  Title,
  Description,
} from './styles';

class User extends Component {
  state = { stars: [], pageCount: 1, loading: false, refreshing: false };

  async componentDidMount() {
    const user = this.getUserData();

    this.setState({ loading: true });

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: response.data, loading: false });
  }

  loadMoreStarreds = async () => {
    const { stars, pageCount } = this.state;
    const user = this.getUserData();

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page: pageCount + 1,
      },
    });

    if (response.data.length)
      this.setState({
        stars: [...stars, ...response.data],
        pageCount: pageCount + 1,
      });
  };

  handleListRefresh = async () => {
    const user = this.getUserData();

    this.setState({ refreshing: true });

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: response.data, refreshing: false, pageCount: 1 });
  };

  getUserData = () => {
    const { navigation } = this.props;
    return navigation.getParam('user');
  };

  render() {
    const { stars, loading, refreshing } = this.state;

    const user = this.getUserData();

    return (
      <Container>
        <Header>
          <Avatar size={100} source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <ActivityIndicator
            style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}
            color="#AAA"
            size="large"
          />
        ) : (
          <List
            onRefresh={this.handleListRefresh}
            refreshing={refreshing}
            onEndReachThreshold={0.2}
            onEndReached={this.loadMoreStarreds}
            data={stars}
            keyExtractor={(star) => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <Avatar size={50} source={item.owner.avatar_url} />
                <Info>
                  <Title>{item.full_name}</Title>
                  <Description>{item.description}</Description>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').name,
});

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

export default User;