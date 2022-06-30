import Link from 'next/link'
import styled from '@emotion/styled'
import Image from 'next/image'
import { Text, useColorModeValue } from '@chakra-ui/react'

const LogoBox = styled.span`
  font-size: 24px;
  display: inline-flex;
  align-items: center;
  height: 40px;
  line-height: 20px;
  padding: 10px;

  img {
    transition: 200ms ease;
  }

  &:hover img {
    transform: rotate(90deg);
  }
`

const Logo = () => {
  const logoImg = `/favicon.ico`
  return (
    <Link href="/">
      <a>
        <LogoBox>
          <Image src={logoImg} alt="logo" width="30" height="30" />
          <Text
            display={['none', 'none', 'none', 'block']}
            color={useColorModeValue('gray.800', 'whiteAlpha.900')}
            fontFamily='"Gothic A1", sans-serif'
            fontWeight="light"
            ml={3}
          >
            Hecla
          </Text>
        </LogoBox>
      </a>
    </Link>
  )
}

export default Logo
