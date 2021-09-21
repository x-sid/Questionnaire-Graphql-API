const { nanoid } = require("nanoid");

exports.generateUrl = ({ req, baseUrl, port }) => {
  const url = nanoid();
  const localHost = `http://localhost:${port}${baseUrl}`;
  const origin = req?.headers.origin || localHost;
  const link = `${origin}/${url}`;
  return { url, link };
};
