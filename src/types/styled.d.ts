import Theme from '../assets/styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
