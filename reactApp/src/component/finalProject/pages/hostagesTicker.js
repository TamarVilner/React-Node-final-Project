import React, { useEffect } from 'react';

const HostagesTicker = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://bringthemhomenow.net/1.1.0/hostages-ticker.js';
    script.setAttribute('integrity', 'sha384-DHuakkmS4DXvIW79Ttuqjvl95NepBRwfVGx6bmqBJVVwqsosq8hROrydHItKdsne');
    script.setAttribute('crossorigin', 'anonymous');
    document.getElementsByTagName('head')[0].appendChild(script);
  }, []);

  return <div id="bthn" lang="en"></div>;
};

export default HostagesTicker;
