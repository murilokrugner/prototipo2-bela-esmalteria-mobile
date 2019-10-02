import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, ProvidersList, Provider, Avatar, Name } from './styles';

export default function SelectServiceAdm({ navigation, provider.id }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = navigation.getParam('user');

  useEffect(() => {
    async function loadServices() {
      const response = await api.get(`services?provider=${provider.id}`);

      setServices(response.data);
      setLoading(false);
    }

    loadServices();
  }, []);

  return (
    <Background>
      { loading ? (
        <ActivityIndicator size="large" color="#FFF" align="center"
        style={styles.load}/>
      ) : (
        <Container>
          <ProvidersList
            data={services}
            keyExtractor={service => String(service.id)}
            renderItem={({ item: service }) => (
              <Provider
                onPress={() =>
                  navigation.navigate('SelectDateTime', { user, service })
                }
              >
                <Name>Tipo: {service.name}</Name>
                <Name>preço: R$-{service.price},00</Name>
                <Name>Duração: {service.duration} minutos</Name>
              </Provider>
            )}
          />
      </Container>
    )}
  </Background>
  );
}

SelectServiceAdm.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o serviço',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SelectUserAdm');
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  load: {
    flex: 1,
    justifyContent: 'center'
  },
})
