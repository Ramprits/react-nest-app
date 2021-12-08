import Container from '@mui/material/Container';
import React, { Fragment } from 'react';

type StructureProps = {
  buckets: React.ReactNode;
};

export function StructureDiv(props: StructureProps) {
  const buckets = {
    '1': Array.isArray(props.buckets) ? props.buckets : [],
  };

  return (
    <Fragment>
      {buckets['1'].map(
        (item: React.ReactNode, idx: React.Key | null | undefined) => (
          <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }} key={idx}>
            {item}
          </Container>
        )
      )}
    </Fragment>
  );
}
