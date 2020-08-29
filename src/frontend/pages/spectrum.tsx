import { Provider, defaultTheme, Button } from '@adobe/react-spectrum';

const Spectrum = () => (
  <Provider theme={defaultTheme}>
    <Button variant="cta" onPress={() => alert('Hi!')}>
      Hello React Spectrum!
    </Button>
  </Provider>
);

export default Spectrum;
