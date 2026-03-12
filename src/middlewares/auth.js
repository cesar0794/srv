import jwt from "jsonwebtoken";

export default function auth(request, response, next) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.json({ message: "Não autorizado" }, 401);
  }

  const token = authorization.replace("Bearer", "").trim();
  try {
    const data = jwt.verify(token, "9b27c03fa7acf6b538fd6f740b6e3ce2");
    const { id } = data;
    request.userId = id;
    return next();
  } catch {
    return response.json({ message: "Não autorizado" }, 401);
  }
}
