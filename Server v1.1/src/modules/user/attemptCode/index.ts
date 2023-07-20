import { getMysqlConnection } from "common";
import { Request, Response } from "express";
import { Server } from "socket.io";

const getScore = (difficulty: number, answerCount: number) => {
  const score =
    answerCount === 0
      ? 50
      : answerCount === 1
      ? 45
      : answerCount === 2
      ? 40
      : answerCount === 3
      ? 35
      : answerCount <= 10
      ? 30
      : answerCount <= 20
      ? 25
      : 10;
  return score * (difficulty || 1);
};

interface AttemptSchema {
  userId: number;
  tokenId: number;
  code: string;
}

const attemptCode = async (
  req: Request<any, any, AttemptSchema>,
  res: Response,
  io: Server
) => {
  console.log("io :>> ", io);

  const { userId, tokenId, code } = req.body;
  const { models } = getMysqlConnection();
  const hasAlreadyAnswered = !!(await models.userToken.findOne({
    where: { userId, tokenId },
  }));

  if (hasAlreadyAnswered)
    return res.send({ status: 400, message: "Already completed this Level" });

  const user = await models.user.findOne({ where: { id: userId } });
  if (!user) return res.send({ status: 400, message: "User does NOT Exist" });

  const token = (await models.token.findOne({ where: { id: tokenId } }))?.get();

  //check if Token exist
  if (!token) return res.send({ status: 400, message: "Token does NOT Exist" });

  const didAnswerCorrectly = token.code === code;

  //check if incorrect token
  if (!didAnswerCorrectly)
    return res.send({
      status: 400,
      message: "Incorrect Token. Please Try Again.",
    });

  const answerCount = await models.userToken.count({ where: { tokenId } });
  const score = getScore(token.difficulty, answerCount);

  const userToken = await models.userToken.create({ userId, tokenId, score });
  io.emit("done", userToken);
  return res.send({ score: score.toFixed(), status: 200 });
};

export default attemptCode;
