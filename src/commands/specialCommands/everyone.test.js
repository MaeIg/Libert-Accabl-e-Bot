import { everyone } from "./everyone.js";
import MockDiscord from "../../mocks/MockDiscord.js";

const messageMock = new MockDiscord().getMessage();
jest.spyOn(messageMock, "reply").mockImplementation(() => null);

it("should call message.reply when everyone is called", () => {
  everyone(messageMock);

  expect(messageMock.reply).toHaveBeenCalledTimes(1);
  expect(messageMock.reply).toHaveBeenCalledWith(
    "Et non tu seras le seul mentionné !"
  );
});
