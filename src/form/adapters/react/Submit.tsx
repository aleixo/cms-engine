import React, { forwardRef } from 'react';

const Submit = forwardRef<HTMLInputElement>((_, ref) => (
  <input ref={ref} name="submit" type="submit" style={{ display: 'none' }} />
));
Submit.displayName = 'Submit';

export default Submit;
