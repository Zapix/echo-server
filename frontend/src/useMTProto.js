import { useEffect, useRef, useState } from 'react';
import { MTPROTO_CONNECTING, MTPROTO_OFFLINE, MTPROTO_ONLINE } from './constants';
import { MTProto } from 'zagram';

export function useMTProto() {
  const [connectionStatus, setConnectionStatus] = useState(MTPROTO_OFFLINE);
  const [currentSchema, setSchema] = useState(null)
  const clientRef = useRef(null);
  useEffect(() => {
    if (!clientRef.current) {
      setConnectionStatus('retrieve pub keys and schema')
      Promise.all([
        fetch('http://localhost:8081/pub-keys').then((r) => r.json()),
        fetch('http://localhost:8081/schema').then((r) => r.json()),
      ]).then(([pubKeys, schema]) => {
        setConnectionStatus('init connection')
        clientRef.current = new MTProto(
          'ws://localhost:8081/ws',
          schema,
          pubKeys,
        );

        setSchema(schema);
        clientRef.current.addEventListener('statusChanged', (e) => {
          console.log(e);
          if (e.status === 'AUTH_KEY_CREATED') {
            setConnectionStatus(MTPROTO_ONLINE);
          } else {
            setConnectionStatus(MTPROTO_OFFLINE)
          }
        });

        clientRef.current.init();
        setConnectionStatus(MTPROTO_CONNECTING)
      });
    }
  }, []);

  return [clientRef, connectionStatus, currentSchema];
}
