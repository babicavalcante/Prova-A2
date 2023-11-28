import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import Router from './src/router/Router';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <PaperProvider>

      <Router />
      <Toast />
      
    </PaperProvider>
  );
}