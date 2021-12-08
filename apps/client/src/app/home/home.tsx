import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Header, StructureDiv } from '@oclm/ui-shared';

/* eslint-disable-next-line */
export interface HomeProps {}

const StyledHome = styled.div``;

export function Home(props: HomeProps) {
  return (
    <StyledHome>
      <Header />
      <StructureDiv buckets={[<Box>Home page</Box>]}></StructureDiv>
    </StyledHome>
  );
}

export default Home;
