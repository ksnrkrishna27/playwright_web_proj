type TestDataStructure = {
  urls: {
    orangeHRMUrl: string;
  };

  loginPage: {
    userName01: string;
    password01: string;
  };
};

const data = {
  urls: {
    orangeHRMUrl:
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  },
  loginPage: {
    userName01: "Admin",
    password01: "admin123",
  },
};

export const testData: {
  [env: string]: TestDataStructure;
} = { SIT: data };
