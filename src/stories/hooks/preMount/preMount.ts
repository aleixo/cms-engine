import { THookPayload } from '../../../form/core/types';
const hook =
  () =>
  ({ data }: { data: THookPayload }) => {
    data.setScope({
      namespace: 'hooks',
      key: 'dropdownOptions',
      data: [
        {
          label: 'Options - 1',
          id: 'Options - 1',
        },
        {
          label: 'Options - 2',
          id: 'Options - 2',
        },
        {
          label: 'Options - 3',
          id: 'Options - 3',
        },
      ],
    });
  };

export default hook;
