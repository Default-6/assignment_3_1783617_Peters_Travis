export const fetchEmails = async () => {
    const response = await fetch('https://gist.githubusercontent.com/mrchenliang/15e1989583fd6e6e04e1c49287934c91/raw/ed03cfea1e2edb0303543d2908cd7429ed75580d/email.json');
    const data = await response.json();
    return data;
  };
  