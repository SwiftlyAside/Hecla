import type { NextPage } from "next";
import Head from "next/head";
import "semantic-ui-css/semantic.min.css";
import { Container, Image, Menu } from "semantic-ui-react";
import SearchBar from "../components/SearchBar";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const search = (term: string) => {
    console.log(term);
  };

  const LoginButton = () => {
    if (session) {
      return (
        <Menu.Item as="a" position="right" onClick={() => signOut()}>
          Logout
        </Menu.Item>
      );
    }
    return (
      <Menu.Item as="a" position="right" onClick={() => signIn()}>
        Login
      </Menu.Item>
    );
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
            <Image size="mini" src="/favicon.ico" alt="logo" style={{ marginRight: "1.5em" }} />
            Hecla
          </Menu.Item>
          <Menu.Item>
            <SearchBar onFormSubmit={search} />
          </Menu.Item>
          {LoginButton()}
        </Container>
      </Menu>
      <Container style={{ marginTop: "7em" }}>
        <div>Empty</div>
      </Container>
    </div>
  );
};

export default Home;
