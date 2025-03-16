import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column, G2 } from '@ant-design/plots';

const DemoColumn = () => {
    var arrayOfObjects = [
        {
          user: "Ahmed",
          order: 12345
        },
        {
          user: "Sara",
          order: 67890
        },
        {
          user: "Mohamed",
          order: 54321
        },
        {
          user: "Layla",
          order: 98765
        },
        {
            user: "John",
            order: 12345
          },
          {
            user: "Emily",
            order: 67890
          },
          {
            user: "Michael",
            order: 54321
          },
          {
            user: "Emma",
            order: 98765
          },
          {
            user: "Daniel",
            order: 24680
          },
          {
            user: "Olivia",
            order: 13579
          },  
          {
            user: "James",
            order: 12345
          },
          {
            user: "Sophia",
            order: 67890
          },
          {
            user: "Alexander",
            order: 54321
          },
          {
            user: "Isabella",
            order: 98765
          },
          {
            user: "William",
            order: 24680
          },
          {
            user: "Ava",
            order: 13579
          },
          {
            user: "Elijah",
            order: 12345
          },
          {
            user: "Aria",
            order: 67890
          },
          {
            user: "Sebastian",
            order: 54321
          },
          {
            user: "Luna",
            order: 98765
          },
          {
            user: "Gabriel",
            order: 24680
          },
          {
            user: "Violet",
            order: 13579
          },
            ];
  const [data, setData] = useState(arrayOfObjects);

  useEffect(() => {
    // asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/be63e0a2-d2be-4c45-97fd-c00f752a66d4.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    xField: 'user',
    yField: 'order',
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
    appendPadding: 10,

    scrollbar: {
      type: 'horizontal',
    },
  };

  return <Column {...config} />;
};
export default DemoColumn