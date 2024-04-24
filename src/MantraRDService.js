// MantraRDService.js

import fetch from 'node-fetch';

export const discoverDevice = async () => {
  try {
    const ports = [...Array(21).keys()].map((_, i) => 11100 + i);
    for (const port of ports) {
      const response = await fetch(`http://127.0.0.1:${port}`, {
        method: 'GET',
        headers: {
          EXT: 'BIOBALLET'
        }
      });
      if (response.ok) {
        const data = await response.json();
        return {
          port,
          path: data.RDService.Interface.path
        };
      }
    }
    throw new Error('No RD Service found');
  } catch (error) {
    console.error('Failed to discover device:', error.message);
    throw error;
  }
};

export const getDeviceInfo = async (port, path) => {
  try {
    const response = await fetch(`http://127.0.0.1:${port}${path}/DEVICEINFO`, {
      method: 'GET',
      headers: {
        HOST: `127.0.0.1:${port}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('Failed to get device info');
  } catch (error) {
    console.error('Failed to get device info:', error.message);
    throw error;
  }
};

export const captureBiometric = async (port, path) => {
  try {
    const response = await fetch(`http://127.0.0.1:${port}${path}/CAPTURE`, {
      method: 'POST',
      headers: {
        HOST: `127.0.0.1:${port}`,
        'Content-Type': 'text/xml'
      },
      body: '<PidOptions ver=""><Opts fCount="1" fType="0" iCount="0" iType="0" pCount="0" pType="0" format="0" pidVer="2.0" timeout="10000" otp="" wadh="" posh="" env=""/><Demo></Demo><CustOpts></CustOpts></PidOptions>'
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('Failed to capture biometric');
  } catch (error) {
    console.error('Failed to capture biometric:', error.message);
    throw error;
  }
};


