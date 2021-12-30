import { AppProps } from "next/app";
import "./reset.css";

const App = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />
}
  
export default App;