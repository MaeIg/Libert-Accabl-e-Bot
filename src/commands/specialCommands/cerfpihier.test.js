import { expect } from "@jest/globals";
import MockDiscord from "../../mocks/MockDiscord";
import { cerfpihier } from "./cerfpihier";

const discordMock = new MockDiscord();
const messageMock = discordMock.getMessage();
const channelMock = discordMock.getTextChannel();
jest.spyOn(channelMock, "send").mockImplementation(() => null);

it("should call channel.send and say when Cerfpihier will attack Shaggyz", () => {
  cerfpihier(messageMock);

  expect(channelMock.send).toHaveBeenCalledTimes(1);
  expect(channelMock.send).toHaveBeenCalledWith(
    expect.stringMatching(
      /Notre ami Cerfpihier se vengera contre Shaggyz dans (\d)+ ans, (\d)+ mois, (\d)+ jours, (\d)+ heures, (\d)+ minutes, et (\d)+ secondes !\nBonne chance à lui dans sa croisade !/
    )
  );
});
