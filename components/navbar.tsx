import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useColorModeValue
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import Logo from './logo'
import { SearchIcon } from '@chakra-ui/icons'
import { signIn, signOut, useSession } from 'next-auth/react'
import { BsSpotify } from 'react-icons/bs'
import useDebounce from '../utils/hooks/useDebounce'
import useSWR from 'swr'
import fetcher from '../lib/fetch'
import { GlobalContext } from '../pages/_app'
import ThemeToggleButton from './theme-toggle-button'

// type LinkItemProps = LinkProps & {
//   href: string
//   children: React.ReactNode
//   path: string
//   _target?: string
// }
//
// const LinkItem = ({
//   href,
//   path,
//   _target,
//   children,
//   ...props
// }: LinkItemProps) => {
//   const isActive = path === href
//   const inactiveColor = useColorModeValue('gray.800', 'whiteAlpha.900')
//   return (
//     <Link href={href} passHref>
//       <ChakraLink
//         borderRadius="md"
//         p={2}
//         bg={isActive ? 'grassTeal' : undefined}
//         color={isActive ? '#202023' : inactiveColor}
//         _target={_target ? _target : undefined}
//         {...props}
//       >
//         {children}
//       </ChakraLink>
//     </Link>
//   )
// }

type NavbarProps = {
  path: string
  terms: string
}

const Navbar = ({ ...props }: NavbarProps) => {
  const { data: session } = useSession()
  const [search, setSearch] = useState('')
  const { setSearchResponse } = useContext(GlobalContext)
  const debouncedSearch = useDebounce(search, 500)

  const { data: credentialToken } = useSWR(['/api/token', 'get'], fetcher)
  const { data } = useSWR(
    [
      `https://api.spotify.com/v1/search?q=${debouncedSearch}&type=track`,
      session ? session.accessToken : credentialToken?.access_token,
      'get'
    ],
    fetcher,
    {}
  )

  if (data && data.tracks) {
    if (setSearchResponse) {
      setSearchResponse(data)
    }
  }

  const LoginButton = () => {
    return session ? (
      <Button size="lg" onClick={() => signOut()}>
        Logout
      </Button>
    ) : (
      <Button size="lg" onClick={() => signIn('spotify')}>
        Login with&nbsp;
        <Icon as={BsSpotify} />
      </Button>
    )
  }

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={1}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="100%"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing="tighter">
            <Logo />
          </Heading>
        </Flex>
        <Stack
          direction={{
            base: 'column',
            md: 'row'
          }}
          display={{
            base: 'none',
            md: 'flex'
          }}
          width={{
            base: 'full',
            md: 'auto'
          }}
          alignItems="center"
          flexGrow={1}
          mt={{
            base: 4,
            md: 0
          }}
        >
          <InputGroup>
            <InputLeftElement className="hecla-input-left" pointerEvents="none">
              <SearchIcon />
            </InputLeftElement>
            <Input
              size="lg"
              variant="filled"
              placeholder="Music Search"
              focusBorderColor="grassTeal"
              onChange={event => {
                setSearch(event.target.value)
              }}
            />
          </InputGroup>
          {LoginButton()}
          <ThemeToggleButton />
        </Stack>
      </Container>
    </Box>
  )
}

export default Navbar
