import type { NextPage } from "next";
import Head from "next/head";
import "semantic-ui-css/semantic.min.css";
import { Container, Header, Image, Menu } from "semantic-ui-react";
import SearchBar from "../components/SearchBar";

const Home: NextPage = () => {
  const search = (term: string) => {
    console.log(term);
  };

  return (
    <div>
      <Head>
        <title>Hecla</title>
        <meta name="description" content="A Web music player" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu fixed="top">
        <Container>
          <Menu.Item as="a" header>
            <Image size="mini" src="/favicon.ico" style={{ marginRight: "1.5em" }} />
            Yes
          </Menu.Item>
          <Menu.Item>
            <SearchBar onFormSubmit={search} />
          </Menu.Item>
          <Menu.Item as="a" position="right">
            Login
          </Menu.Item>
        </Container>
      </Menu>
      <Container style={{ marginTop: "7em" }}>
        <div>dasdad</div>
      </Container>
    </div>
  );
};

export default Home;
