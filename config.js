const fs = require('fs');
const { Sequelize } = require('sequelize');
const isVPS = !(__dirname.startsWith("/rgnk") || __dirname.startsWith("/skl"));
const isHeroku = __dirname.startsWith("/skl");
const isKoyeb = __dirname.startsWith("/rgnk");
const isRailway = __dirname.startsWith("/railway");
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true',fault2='on') {
    return ((text === fault) || (text === fault2));
}
const settingsMenu = [
    {title: "PM antispam block", env_var: "PM_ANTISPAM"},
    {title: "Auto read all messages", env_var: "READ_MESSAGES"},
    {title: "Auto read command messages", env_var: "READ_COMMAND"},
    {title: "Auto read status updates", env_var: "AUTO_READ_STATUS"},
    {title: "Admin sudo acces mode (group commands only)", env_var: "ADMIN_ACCESS"},
    {title: "With & without handler mode", env_var: "MULTI_HANDLERS"},
    {title: "Auto reject calls", env_var: "REJECT_CALLS"},
    {title: "Always online", env_var: "ALWAYS_ONLINE"},
    {title: "PM Auto blocker", env_var: "PMB_VAR"},
    {title: "Disable bot in PM", env_var: "DIS_PM"}
  ]
DATABASE_URL = process.env.DATABASE_URL === undefined ? './bot.db' : process.env.DATABASE_URL;
DEBUG = process.env.DEBUG === undefined ? false : convertToBool(process.env.DEBUG);
if (!(process.env.SESSION || process.env.SESSION_ID)) throw new Error("No session found, add session before starting bot")
module.exports = {
    CMD_INFO: '
╭════〘 *_ᴅᴏᴡɴʟᴏᴀᴅ_* 〙════⊷❍
┃✰│ _1. ɪɴsᴛᴀ_
┃✰│ _2. ғʙ_
┃✰│ _3. sᴛᴏʀʏ_
┃✰│ _4. ᴘɪɴᴛᴇʀᴇsᴛ_
┃✰│ _5. ᴘɪɴ_
┃✰│ _6. ᴛɪᴋᴛᴏᴋ_
┃✰│ _7. ʟʏʀɪᴄs_
┃✰│ _8. ᴜᴘʟᴏᴀᴅ_
┃✰│ _9. ᴠɪᴅᴇᴏ_
┃✰│ _10. sᴜʙᴛɪᴛʟᴇ_
┃✰│ _11. ᴘʟᴀʏ_
┃✰│ _12. ʏᴛᴠ_
┃✰│ _13. sᴏɴɢ_
┃✰╰─────────────────❍
╰══════════════════⊷❍

╭════〘 *_sᴇᴀʀᴄʜ_* 〙════⊷❍

┃✰│ _14. ɪɢ_
┃✰│ _15. ғɪɴᴅ_
┃✰│ _16. ɪᴍɢ_
┃✰│ _17. ᴢɪᴘᴄᴏᴅᴇ_
┃✰│ _18. ᴍᴏᴠɪᴇ_
┃✰│ _19. ᴛʀᴜᴇ_
┃✰│ _20. ʏᴛs_
┃✰╰─────────────────❍
╰══════════════════⊷❍

╭════〘 *_ᴏᴡɴᴇʀ_* 〙════⊷❍

┃✰│ _21. ʀᴇsᴛᴀʀᴛ_
┃✰│ _22. sʜᴜᴛᴅᴏᴡɴ_
┃✰│ _23. ᴅʏɴᴏ_
┃✰│ _24. sᴇᴛᴠᴀʀ_
┃✰│ _25. ᴅᴇʟᴠᴀʀ_
┃✰│ _26. ɢᴇᴛᴠᴀʀ_
┃✰│ _27. ᴀʟʟᴠᴀʀ_
┃✰│ _28. sᴇᴛᴛɪɴɢs_
┃✰│ _29. sᴇᴛsᴜᴅᴏ_
┃✰│ _30. ɢᴇᴛsᴜᴅᴏ_
┃✰│ _31. ᴜᴘᴅᴀᴛᴇ_
┃✰│ _32. ᴜᴘᴅᴀᴛᴇ sᴛᴀʀᴛ_
┃✰│ _33. ᴜᴘᴅᴛ_
┃✰│ _34. ɪɴsᴛᴀʟʟ_
┃✰│ _35. ᴘʟᴜɢɪɴ_
┃✰│ _36. ʀᴇᴍᴏᴠᴇ_
┃✰│ _37. ʙʟᴏᴄᴋ_
┃✰│ _38. ᴊᴏɪɴ_
┃✰│ _39. ᴜɴʙʟᴏᴄᴋ_
┃✰│ _40. ᴘᴘ_
┃✰│ _41. ɢᴘᴘ_
┃✰╰─────────────────❍
╰══════════════════⊷❍

╭════〘 *_ᴇᴅɪᴛ_* 〙════⊷❍

┃✰│ _42. sᴛɪᴄᴋᴇʀ_
┃✰│ _43. ᴍᴘ3_
┃✰│ _44. sʟᴏᴡ_
┃✰│ _45. sᴘᴇᴇᴅ_
┃✰│ _46. ʙᴀss_
┃✰│ _47. ᴘʜᴏᴛᴏ_
┃✰│ _48. ᴛʀɪᴍ_
┃✰│ _49. ʙʟᴀᴄᴋ_
┃✰│ _50. ᴀᴠᴍɪx_
┃✰│ _51. ᴠᴍɪx_
┃✰│ _52. sʟᴏᴡᴍᴏ_
┃✰│ _53. ᴄɪʀᴄʟᴇ_
┃✰│ _54. ɪɴᴛᴇʀᴘ_
┃✰│ _55. ᴛᴀᴋᴇ_
┃✰╰─────────────────❍
╰══════════════════⊷❍

╭════〘 *_ɢʀᴏᴜᴘ_* 〙════⊷❍

┃✰│ _56. ᴛᴏɢɢʟᴇ_
┃✰│ _57. ᴀɴᴛɪʙᴏᴛ_
┃✰│ _58. ᴀɴᴛɪsᴘᴀᴍ_
┃✰│ _59. ᴘᴅᴍ_
┃✰│ _60. ᴀɴᴛɪᴅᴇᴍᴏᴛᴇ_
┃✰│ _61. ᴀɴᴛɪᴘʀᴏᴍᴏᴛᴇ_
┃✰│ _62. ᴀɴᴛɪʟɪɴᴋ_
┃✰│ _63. ᴀɴᴛɪᴡᴏʀᴅ_
┃✰│ _64. ᴡᴇʟᴄᴏᴍᴇ_
┃✰│ _65. ᴡᴇʟᴄᴏᴍᴇ_
┃✰│ _66. ɢᴏᴏᴅʙʏᴇ_
┃✰│ _67. ɢᴏᴏᴅʙʏᴇ_
┃✰│ _68. ᴡᴀᴘᴏʟʟ_
┃✰│ _69. ᴋɪᴄᴋ_
┃✰│ _70. ᴀᴅᴅ_
┃✰│ _71. ᴘʀᴏᴍᴏᴛᴇ_
┃✰│ _72. ʀᴇǫᴜᴇsᴛs_
┃✰│ _73. ᴅᴇᴍᴏᴛᴇ_
┃✰│ _74. ᴍᴜᴛᴇ_
┃✰│ _75. ᴜɴᴍᴜᴛᴇ_
┃✰│ _76. ᴊɪᴅ_
┃✰│ _77. ɪɴᴠɪᴛᴇ_
┃✰│ _78. ʀᴇᴠᴏᴋᴇ_
┃✰│ _79. ɢʟᴏᴄᴋ_
┃✰│ _80. ɢᴜɴʟᴏᴄᴋ_
┃✰│ _81. ɢɴᴀᴍᴇ_
┃✰│ _82. ɢᴅᴇsᴄ_
┃✰│ _83. ᴄᴏᴍᴍᴏɴ_
┃✰│ _84. ᴛᴀɢᴀʟʟ_
┃✰│ _85. ᴀᴜᴛᴏᴍᴜᴛᴇ_
┃✰│ _86. ᴀᴜᴛᴏᴜɴᴍᴜᴛᴇ_
┃✰│ _87. ɢᴇᴛᴍᴜᴛᴇ_
┃✰│ _88. ᴀɴᴛɪғᴀᴋᴇ_
┃✰│ _89. ᴛᴀɢ_
┃✰│ _90. ᴡᴀʀɴ_
┃✰│ _91. ʀᴇsᴇᴛ ᴡᴀʀɴ_
┃✰╰─────────────────❍
╰══════════════════⊷❍

╭════〘 *_ᴜᴛɪʟɪᴛʏ_* 〙════⊷❍

┃✰│ _92. s_
┃✰│ _93. ᴘɪɴɢ_
┃✰│ _94. ᴜᴘᴛɪᴍᴇ_
┃✰│ _95. ᴀᴛᴛᴘ_
┃✰│ _96. ᴀɢᴇ_
┃✰│ _97. ᴄɴᴛᴅ_
┃✰│ _98. ғᴀɴᴄʏ_
┃✰│ _99. ғɪʟᴛᴇʀ_
┃✰│ _100. sᴛᴏᴘ_
┃✰│ _101. ᴄғɪʟᴛᴇʀ_
┃✰│ _102. ɢғɪʟᴛᴇʀ_
┃✰│ _103. ᴅғɪʟᴛᴇʀ_
┃✰│ _104. ᴄsᴛᴏᴘ_
┃✰│ _105. ᴅsᴛᴏᴘ_
┃✰│ _106. ɢsᴛᴏᴘ_
┃✰│ _107. ᴅɪғғ_
┃✰│ _108. sᴛɪᴄᴋᴄᴍᴅ_
┃✰│ _109. ᴜɴsᴛɪᴄᴋ_
┃✰│ _110. ɢᴇᴛsᴛɪᴄᴋ_
┃✰│ _111. ᴠᴠ_
┃✰│ _112. ᴛʀᴛ_
┃✰│ _113. ᴛᴛs_
┃✰│ _114. ᴅᴏᴄ_
┃✰│ _115. ʜᴀᴄᴋᴇʀɴᴇᴡs_
┃✰│ _116. ᴡᴀᴜᴘᴅᴀᴛᴇ_
┃✰│ _117. ɴᴇᴡs_
┃✰│ _118. ᴍᴇᴅɪᴀғɪʀᴇ_
┃✰│ _119. ss_
┃✰│ _120. ᴅᴇᴛᴇᴄᴛʟᴀɴɢ_
┃✰│ _121. ғᴏʀᴡᴀʀᴅ_
┃✰│ _122. sᴇɴᴅ_
┃✰│ _123. ɢᴇᴛᴊɪᴅs_
┃✰│ _124. ᴜʀʟ_
┃✰╰─────────────────❍
╰══════════════════⊷❍

╭════〘 *_ᴛᴇᴍᴘʟᴀᴛᴇ ᴇᴅɪᴛ_* 〙════⊷❍

┃✰│ _125. ᴡᴀɴᴛᴇᴅ_
┃✰│ _126. ᴍɪssɪᴏɴ ғᴀɪʟᴇᴅ_
┃✰│ _127. ᴅᴇʟᴇᴛᴇ_
┃✰│ _128. ʀᴇsᴘᴇᴄᴛ_
┃✰│ _129. ᴡᴀsᴛᴇᴅ_
┃✰│ _130. ʙʟᴜʀ_
┃✰│ _131. ᴅʀᴀᴡ_
┃✰│ _132. sᴋᴇᴛᴄʜ_
┃✰│ _133. ʀɪᴘ_
┃✰│ _134. sᴄᴀʀʏ_
┃✰│ _135. ᴍɪssɪᴏɴ ᴘᴀssᴇᴅ_
┃✰│ _136. ʀᴇᴊᴇᴄᴛ_
┃✰│ _137. ᴊᴀɪʟ_
┃✰│ _138. ᴄᴏɴᴛʀᴀsᴛ_
┃✰│ _139. ʏᴛᴄᴏᴍᴍᴇɴᴛ_
┃✰│ _140. ʙᴜʀɴ_
┃✰│ _141. ғɪʀᴇ_
┃✰│ _142. ᴛʀᴀsʜ_
┃✰│ _143. ᴀᴘᴘʀᴏᴠᴇ_
┃✰│ _144. ᴛʀɪɢɢᴇʀ_
┃✰╰─────────────────❍
╰══════════════════⊷❍

╭════〘 *_ʟᴏɢᴏ_* 〙════⊷❍

┃✰│ _145. ʟᴏɢᴏ_
┃✰│ _146. ʟᴏɢᴏ 01_
┃✰│ _147. ʟᴏɢᴏ 02_
┃✰│ _148. ʟᴏɢᴏ 03_
┃✰│ _149. ʟᴏɢᴏ 04_
┃✰│ _150. ʟᴏɢᴏ 05_
┃✰│ _151. ʟᴏɢᴏ 06_
┃✰│ _152. ʟᴏɢᴏ 07_
┃✰│ _153. ʟᴏɢᴏ 08_
┃✰│ _154. ʟᴏɢᴏ 09_
┃✰│ _155. ʟᴏɢᴏ 10_
┃✰│ _156. ʟᴏɢᴏ 11_
┃✰│ _157. ʟᴏɢᴏ 12_
┃✰│ _158. ʟᴏɢᴏ 13_
┃✰│ _159. ʟᴏɢᴏ 14_
┃✰│ _160. ʟᴏɢᴏ 15_
┃✰│ _161. ʟᴏɢᴏ 16_
┃✰│ _162. ʟᴏɢᴏ 17_
┃✰│ _163. ʟᴏɢᴏ 18_
┃✰│ _164. ʟᴏɢᴏ 19_
┃✰│ _165. ʟᴏɢᴏ 20_
┃✰│ _166. ʟᴏɢᴏ 21_
┃✰│ _167. ʟᴏɢᴏ 22_
┃✰│ _168. ʟᴏɢᴏ 23_
┃✰│ _169. ʟᴏɢᴏ 24_
┃✰│ _170. ʟᴏɢᴏ 25_
┃✰│ _171. ʟᴏɢᴏ 26_
┃✰│ _172. ʟᴏɢᴏ 27_
┃✰│ _173. ʟᴏɢᴏ 28_
┃✰│ _174. ʟᴏɢᴏ 29_
┃✰│ _175. ʟᴏɢᴏ 30_
┃✰│ _176. ʟᴏɢᴏ 31_
┃✰│ _177. ʟᴏɢᴏ 32_
┃✰│ _178. ʟᴏɢᴏ 33_
┃✰│ _179. ʟᴏɢᴏ 34_
┃✰│ _180. ʟᴏɢᴏ 35_
┃✰│ _181. ʟᴏɢᴏ 36_
┃✰│ _182. ʟᴏɢᴏ 37_
┃✰│ _183. ʟᴏɢᴏ 38_
┃✰│ _184. ʟᴏɢᴏ 39_
┃✰│ _185. ʟᴏɢᴏ 40_
┃✰│ _186. ʟᴏɢᴏ 41_
┃✰│ _187. ʟᴏɢᴏ 42_
┃✰│ _188. ʟᴏɢᴏ 43_
┃✰│ _189. ʟᴏɢᴏ 44_
┃✰│ _190. ʟᴏɢᴏ 45_
┃✰│ _191. ʟᴏɢᴏ 46_
┃✰│ _192. ʟᴏɢᴏ 47_
┃✰│ _193. ʟᴏɢᴏ 48_
┃✰│ _194. ʟᴏɢᴏ 49_
┃✰│ _195. ʟᴏɢᴏ 46_
┃✰│ _196. ʟᴏɢᴏ 50_
┃✰│ _197. ʟᴏɢᴏ 51_
┃✰│ _198. ʟᴏɢᴏ 52_
┃✰│ _199. ʟᴏɢᴏ 53_
┃✰│ _200. ʟᴏɢᴏ 54_
┃✰│ _201. ʟᴏɢᴏ 55_
┃✰│ _202. ʟᴏɢᴏ 56_
┃✰│ _203. ʟᴏɢᴏ 57_
┃✰│ _204. ʟᴏɢᴏ 58_
┃✰│ _205. ᴀᴀᴅʜᴀʀ_
┃✰│ _206. ʙʟᴜʀ_
┃✰╰─────────────────❍
╰══════════════════⊷❍

╭════〘 *_ᴄᴏɴғɪɢ_* 〙════⊷❍

┃✰│ _207. ᴄʜᴀᴛʙᴏᴛ_
┃✰╰─────────────────❍
╰══════════════════⊷❍

╭════〘 *_ᴀɪ_* 〙════⊷❍

┃✰│ _208. ʀᴇᴍᴏᴠᴇʙɢ_
┃✰│ _209. ᴜᴘsᴄᴀʟᴇ_
┃✰│ _210. ɢᴘᴛ_
┃✰│ _211. ᴅᴀᴠɪɴᴄɪ_
┃✰╰─────────────────❍
╰══════════════════⊷❍

╭════〘 *_ᴍɪsᴄ_* 〙════⊷❍

┃✰│ _212. ᴄʟᴇᴀʀ_
┃✰╰─────────────────❍
╰══════════════════⊷❍

╭════〘 *_ᴄᴏɴᴠᴇʀᴛᴇʀs_* 〙════⊷❍

┃✰│ _213. ᴘᴅғ_
┃✰╰─────────────────❍
╰══════════════════⊷❍

╭════〘 *_ᴛᴇxᴛᴍᴀᴋᴇʀ_* 〙════⊷❍

┃✰│ _214. ᴛɪᴛʟᴇ_
┃✰│ _215. ɢʟᴏᴡsʟɪᴄᴇᴅ_
┃✰│ _216. ᴡʜɪᴛᴇɢᴏʟᴅ_
┃✰│ _217. ʙᴀᴛᴍᴀɴ_
┃✰│ _218. ɢʀᴇᴇɴʜᴏʀʀᴏʀ_
┃✰│ _219. ɢʟɪᴛᴄʜ_
┃✰│ _220. ᴍɪɴɪᴏɴ_
┃✰│ _221. ᴍᴀᴛʀɪx_
┃✰│ _222. ʀᴏᴀᴅ_
┃✰│ _223. ᴇʀᴏᴅᴇᴅᴍᴇᴛᴀʟ_
┃✰│ _224. ᴄᴀʀʙᴏɴ_
┃✰│ _225. ᴊᴏᴋᴇʀ_
┃✰│ _226. ᴏʀᴀɴɢᴇ_
┃✰│ _227. sᴛᴏɴᴇ_
┃✰│ _228. ʀᴇᴛʀᴏ_
┃✰│ _229. sʟɪᴄᴇᴅ_
┃✰│ _230. 2ɢʟɪᴛᴄʜ_
┃✰│ _231. sᴘᴀʀᴋʟᴇ_
┃✰│ _232. ɴᴇᴏɴ_
┃✰│ _233. ᴛʜᴜɴᴅᴇʀ_
┃✰│ _234. ʙᴏᴋᴇʜ_
┃✰│ _235. ᴅᴇᴠɪʟ_
┃✰│ _236. ʙʟᴀᴄᴋᴘɪɴᴋ_
┃✰│ _237. 2ʀᴇᴛʀᴏ_
┃✰│ _238. sᴜᴍᴍᴇʀ_
┃✰│ _239. ᴅᴇᴍᴏɴ_
┃✰│ _240. ʟᴀᴠᴀ_
┃✰│ _241. ᴘᴀᴘᴇʀ_
┃✰│ _242. sᴘᴀᴄᴇ_
┃✰│ _243. 8ʙɪᴛ_
┃✰│ _244. ᴄᴀᴍᴇʀɪᴄᴀ_
┃✰│ _245. ᴘᴇɴᴄɪʟ_
┃✰│ _246. ғᴏɢɢʏ_
┃✰│ _247. ɢʀᴀғғɪᴛɪ_
┃✰│ _248. 2ɢʀᴀғғɪᴛɪ_
┃✰│ _249. 3ɢʀᴀғғɪᴛɪ_
┃✰│ _250. ᴘʜᴜʙ_
┃✰│ _251. ᴍᴀʀᴠᴇʟ_
┃✰│ _252. 2ᴍᴀʀᴠᴇʟ_
┃✰╰─────────────────❍
╰══════════════════⊷❍

╭════〘 *_ᴡʜᴀᴛsᴀᴘᴘ_* 〙════⊷❍

┃✰│ _253. ᴏɴᴡᴀ_
┃✰│ _254. ʀᴇᴀᴄᴛ_
┃✰│ _255. ᴇᴅɪᴛ_
┃✰╰─────────────────❍
╰══════════════════⊷❍

╭════〘 *_sᴇᴛᴛɪɴɢs_* 〙════⊷❍

┃✰│ _256. ᴘʟᴀᴛғᴏʀᴍ_
┃✰│ _257. ʟᴀɴɢᴜᴀɢᴇ_
┃✰│ _258. ᴍᴏᴅᴇ_
┃✰╰─────────────────❍
╰══════════════════⊷❍

╭════〘 *_ᴏᴛʜᴇʀs_* 〙════⊷❍

┃✰│ _259. ɪɴғᴏ_
┃✰│ _260. ʟɪsᴛ_
┃✰│ _261. ᴅᴇʟsᴜᴅᴏ_
┃✰│ _262. ᴀғᴋ_
┃✰│ _263. s_
┃✰│ _264. s_
┃✰│ _265. sǫᴜᴀʀᴇ_
┃✰│ _266. ᴅᴇʟ_
┃✰│ _267. ʀᴇʙᴏᴏᴛ_
┃✰│ _268. ʟᴇᴀᴠᴇ_
┃✰│ _269. ǫᴜᴏᴛᴇᴅ_
┃✰│ _270. ᴍsɢs_
┃✰│ _271. ɢɪғ_
┃✰│ _272. ʀᴏᴛᴀᴛᴇ_
┃✰│ _273. ғʟɪᴘ_
┃✰│ _274. ɪɴᴀᴄᴛɪᴠᴇ_
┃✰│ _275. ᴘᴏʟʟ_
┃✰│ _276. ᴍᴍᴀᴅᴅᴘᴏʟʟ_
┃✰│ _277. ᴅʀɪᴠᴇ_
┃✰│ _278. ᴇᴍᴏᴊɪ_
┃✰│ _279. ᴍᴘ4_
┃✰╰─────────────────❍
╰══════════════════⊷❍ ',
    VERSION: 'v4.0.0',
    ALIVE: process.env.ALIVE || "https://telegra.ph/file/f2fa5ee991b8d42030ece.jpg *𓆩ســورس ريبـــثون يــعـمل بنجــاح𓆪* {sender} :*المستخدم* \n *وقت التشغيل*: {uptime} \n *الاصدار* [v3.1.3]",
    BLOCK_CHAT: process.env.BLOCK_CHAT || '',
    PM_ANTISPAM: convertToBool(process.env.PM_ANTISPAM) || '',
    ALWAYS_ONLINE: convertToBool(process.env.ALWAYS_ONLINE) || false,
    MANGLISH_CHATBOT: convertToBool(process.env.MANGLISH_CHATBOT) || false,
    ADMIN_ACCESS: convertToBool(process.env.ADMIN_ACCESS) || false,
    PLATFORM:isHeroku?"Heroku":isRailway?"Railway":isKoyeb?"Koyeb":"Other server",isHeroku,isKoyeb,isVPS,isRailway,
    AUTOMUTE_MSG: process.env.AUTOMUTE_MSG || '_Group automuted!_\n_(edit AUTOMUTE_MSG)_',
    ANTIWORD_WARN: process.env.ANTIWORD_WARN || '',
    ANTI_SPAM: process.env.ANTI_SPAM || '919074309534-1632403322@g.us',
    MULTI_HANDLERS: convertToBool(process.env.MULTI_HANDLERS) || false,
    DISABLED_COMMANDS: (process.env.DISABLED_COMMANDS ? process.env.DISABLED_COMMANDS.split(",") : undefined) || [],
    ANTI_BOT: process.env.ANTI_BOT || '',
    ANTISPAM_COUNT: process.env.ANTISPAM_COUNT || '6/10', // msgs/sec
    AUTOUNMUTE_MSG: process.env.AUTOUNMUTE_MSG || '_Group auto unmuted!_\n_(edit AUTOUNMUTE_MSG)_',
    AUTO_READ_STATUS: convertToBool(process.env.AUTO_READ_STATUS) || false,
    READ_MESSAGES: convertToBool(process.env.READ_MESSAGES) || false,
    PMB_VAR: convertToBool(process.env.PMB_VAR) || false,
    DIS_PM: convertToBool(process.env.DIS_PM) || false,
    REJECT_CALLS: convertToBool(process.env.REJECT_CALLS) || false,
    PMB: process.env.PMB || '_Personal messages not allowed, BLOCKED!_',
    READ_COMMAND: convertToBool(process.env.READ_COMMAND) || true,
    SESSION: (process.env.SESSION || process.env.SESSION_ID || '').trim() || '',
    IMGBB_KEY: ["76a050f031972d9f27e329d767dd988f", "deb80cd12ababea1c9b9a8ad6ce3fab2", "78c84c62b32a88e86daf87dd509a657a"],
    RG: process.env.RG || '919074309534-1632403322@g.us,120363116963909366@g.us',
    BOT_INFO: process.env.BOT_INFO || 'Repthon;Skl11;0;https://telegra.ph/file/f2fa5ee991b8d42030ece.jpg;https://chat.whatsapp.com/Dt3C4wrQmt0GG6io1IBIHb',
    RBG_KEY: process.env.RBG_KEY || '',
    ALLOWED: process.env.ALLOWED || '91,94,2',
    NOT_ALLOWED: process.env.ALLOWED || '91,94,212',
    CHATBOT: process.env.CHATBOT || 'off',
    HANDLERS: process.env.HANDLERS || '.,',
    STICKER_DATA: process.env.STICKER_DATA || "Repthon",
    BOT_NAME: process.env.BOT_NAME || 'Repthon',
    AUDIO_DATA: process.env.AUDIO_DATA === undefined || process.env.AUDIO_DATA === "private" ? '𓆩ꪶ͢٭𝐑𝐞𝐩𝐭𝐡𝐨𝐧¹¹ꫂ𓆪;Repthon MD bot;https://telegra.ph/file/f2fa5ee991b8d42030ece.jpg' : process.env.AUDIO_DATA,
    TAKE_KEY: process.env.TAKE_KEY || '',
    MODE: process.env.MODE || 'private',
    WARN: process.env.WARN || '4',
    ANTILINK_WARN: process.env.ANTILINK_WARN || '',
    HEROKU: {
        HEROKU: process.env.HEROKU === undefined ? false : convertToBool(process.env.HEROKU),
        API_KEY: process.env.HEROKU_API_KEY || '',
        APP_NAME: process.env.HEROKU_APP_NAME || ''
    },
    DATABASE_URL: DATABASE_URL,
    DATABASE: DATABASE_URL === './bot.db' ? new Sequelize({ dialect: "sqlite", storage: DATABASE_URL, logging: DEBUG }) : new Sequelize(DATABASE_URL, { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, logging: DEBUG }),
    SUDO: process.env.SUDO || "",
    LANGUAGE: process.env.LANGUAGE || 'english',
    DEBUG: DEBUG,
    ACR_A: "ff489a0160188cf5f0750eaf486eee74",
    ACR_S: "ytu3AdkCu7fkRVuENhXxs9jsOW4YJtDXimAWMpJp",
    settingsMenu
};
