import 'react';
import { useCallback, useState } from 'react';

export function useNode() {

  const [ node, setNode ] = useState(null);

  const attachNode = useCallback(node => {
    if (node !== null) {
      setNode(node);
    }
  }, []);

  return [ node, attachNode ];
}
