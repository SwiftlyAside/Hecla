import type { NextPage } from "next";
import Head from "next/head";
import "semantic-ui-css/semantic.min.css";
import { Button, Container, Grid, Header, Icon, Image, Menu, Modal } from "semantic-ui-react";
import SearchBar from "../components/SearchBar";
import { signIn, signOut, useSession } from "next-auth/react";
import useSWR from "swr";
import React, { useState } from "react";
import fetcher from "../lib/fetch";
import MusicDetail from "../components/MusicDetail";
import MusicList from "../components/MusicList";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const { data: credentialToken } = useSWR(["/api/token", "get"], fetcher);
  const { data } = useSWR(
    [
      `https://api.spotify.com/v1/search?q=${term}&type=track`,
      session ? session.accessToken : credentialToken?.access_token,
      "get",
    ],
    fetcher,
    {},
  );

  const onMusicSelect = (music: any) => {
    if (!session) {
      setOpen(true);
      return;
    }
    setSelectedMusic(music);
    fetch("https://api.spotify.com/v1/me/player/play", {
      method: "put",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({
        uris: [music.uri],
      }),
    });
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
      <Menu.Item as="a" position="right" onClick={() => signIn("spotify")}>
        Login with&nbsp;
        <Icon size="large" name="spotify" />
      </Menu.Item>
    );
  };
  let musics = [];

  if (data) {
    musics = data.tracks?.items;
  }

  return (
    <>
      <Head>
        <title>Hecla</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="description" content="A Web music player" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
        trigger={<Button>ok</Button>}
      >
        <Header icon>
          <Icon name="exclamation" />
          Play Failed
        </Header>
        <Modal.Content>
          <p>You must login to play a song.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={() => setOpen(false)}>
            Confirm
          </Button>
        </Modal.Actions>
      </Modal>
      <Menu fixed="top">
        <Container>
          <Menu.Item as="a" header>
            <Image size="mini" src="/favicon.ico" alt="logo" rounded />
            &nbsp;Hecla
          </Menu.Item>
          <Menu.Item style={{ flexGrow: 1 }}>
            <SearchBar
              term={term}
              onChange={(event) => {
                setTerm(event.target.value);
              }}
            />
          </Menu.Item>
          {LoginButton()}
        </Container>
      </Menu>
      <Grid className="hecla-container" container stackable columns={2} divided>
        <Grid.Row>
          <Grid.Column width={11}>
            <MusicDetail music={selectedMusic} />
          </Grid.Column>
          <Grid.Column width={5}>
            <MusicList musics={musics} onMusicSelect={onMusicSelect} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Home;
