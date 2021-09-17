"use strict";
var Globals = (function () {
    function Globals() {
    }
    Globals.debugMode = !chrome.runtime.getManifest().update_url;
    Globals.discordChannelUrl = "https://discord.com/channels/357247482247380994/358044869685673985";
    Globals.SETTING_CODES = "redeemedCodes";
    Globals.SETTING_PENDING = "pendingCodes";
    Globals.SETTING_INSTANCE_ID = "instanceId";
    Globals.SETTING_USER_HASH = "userHash";
    Globals.SETTING_USER_ID = "userId";
    return Globals;
}());
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var CodeSubmitResponse = (function () {
    function CodeSubmitResponse(status, lootDetail) {
        this.status = status;
        this.lootDetail = lootDetail;
    }
    return CodeSubmitResponse;
}());
var OpenChestResponse = (function () {
    function OpenChestResponse(status, lootDetail) {
        this.status = status;
        this.lootDetail = lootDetail;
    }
    return OpenChestResponse;
}());
var CodeSubmitStatus;
(function (CodeSubmitStatus) {
    CodeSubmitStatus[CodeSubmitStatus["Success"] = 0] = "Success";
    CodeSubmitStatus[CodeSubmitStatus["OutdatedInstanceId"] = 1] = "OutdatedInstanceId";
    CodeSubmitStatus[CodeSubmitStatus["AlreadyRedeemed"] = 2] = "AlreadyRedeemed";
    CodeSubmitStatus[CodeSubmitStatus["InvalidParameters"] = 3] = "InvalidParameters";
    CodeSubmitStatus[CodeSubmitStatus["NotValidCombo"] = 4] = "NotValidCombo";
    CodeSubmitStatus[CodeSubmitStatus["Expired"] = 5] = "Expired";
    CodeSubmitStatus[CodeSubmitStatus["Failed"] = 6] = "Failed";
})(CodeSubmitStatus || (CodeSubmitStatus = {}));
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["Success"] = 0] = "Success";
    ResponseStatus[ResponseStatus["OutdatedInstanceId"] = 1] = "OutdatedInstanceId";
    ResponseStatus[ResponseStatus["Failed"] = 2] = "Failed";
    ResponseStatus[ResponseStatus["InsuficcientCurrency"] = 3] = "InsuficcientCurrency";
})(ResponseStatus || (ResponseStatus = {}));
var IdleChampionsApi = (function () {
    function IdleChampionsApi() {
    }
    IdleChampionsApi.getServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var request, response, serverDefs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = new URL('https://master.idlechampions.com/~idledragons/post.php');
                        request.searchParams.append("call", "getPlayServerForDefinitions");
                        request.searchParams.append("mobile_client_version", "999");
                        request.searchParams.append("network_id", IdleChampionsApi.NETWORK_ID);
                        request.searchParams.append("timestamp", "0");
                        request.searchParams.append("request_id", "0");
                        request.searchParams.append("localization_aware", "true");
                        return [4, fetch(request.toString())];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3, 3];
                        return [4, response.json()];
                    case 2:
                        serverDefs = _a.sent();
                        return [2, serverDefs.play_server + "post.php"];
                    case 3: return [2, undefined];
                }
            });
        });
    };
    IdleChampionsApi.submitCode = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response, redeemResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = new URL(options.server);
                        request.searchParams.append("call", "redeemcoupon");
                        request.searchParams.append("user_id", options.user_id);
                        request.searchParams.append("hash", options.hash);
                        request.searchParams.append("code", options.code);
                        request.searchParams.append("instance_id", options.instanceId);
                        request.searchParams.append("timestamp", "0");
                        request.searchParams.append("request_id", "0");
                        request.searchParams.append("language_id", IdleChampionsApi.LANGUAGE_ID);
                        request.searchParams.append("network_id", IdleChampionsApi.NETWORK_ID);
                        request.searchParams.append("mobile_client_version", IdleChampionsApi.CLIENT_VERSION);
                        request.searchParams.append("localization_aware", "true");
                        return [4, fetch(request.toString())];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3, 3];
                        return [4, response.json()];
                    case 2:
                        redeemResponse = _a.sent();
                        if (!redeemResponse) {
                            console.error("No json response");
                            return [2, new CodeSubmitResponse(CodeSubmitStatus.Failed)];
                        }
                        console.debug(redeemResponse);
                        if (redeemResponse.success && redeemResponse.failure_reason === "you_already_redeemed_combination") {
                            return [2, new CodeSubmitResponse(CodeSubmitStatus.AlreadyRedeemed)];
                        }
                        if (redeemResponse.success && redeemResponse.failure_reason === "offer_has_expired") {
                            return [2, new CodeSubmitResponse(CodeSubmitStatus.Expired)];
                        }
                        if (redeemResponse.success && redeemResponse.failure_reason === "not_valid_combination") {
                            return [2, new CodeSubmitResponse(CodeSubmitStatus.NotValidCombo)];
                        }
                        if (redeemResponse.success) {
                            return [2, new CodeSubmitResponse(CodeSubmitStatus.Success, redeemResponse === null || redeemResponse === void 0 ? void 0 : redeemResponse.loot_details)];
                        }
                        if (!redeemResponse.success && redeemResponse.failure_reason === "Outdated instance id") {
                            return [2, new CodeSubmitResponse(CodeSubmitStatus.OutdatedInstanceId)];
                        }
                        if (!redeemResponse.success && redeemResponse.failure_reason === "Invalid or incomplete parameters") {
                            return [2, new CodeSubmitResponse(CodeSubmitStatus.InvalidParameters)];
                        }
                        console.error("Unknown failure reason");
                        return [2, new CodeSubmitResponse(CodeSubmitStatus.Failed)];
                    case 3: return [2, new CodeSubmitResponse(CodeSubmitStatus.Failed)];
                }
            });
        });
    };
    IdleChampionsApi.getUserDetails = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response, playerData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = new URL(options.server);
                        request.searchParams.append("call", "getuserdetails");
                        request.searchParams.append("user_id", options.user_id);
                        request.searchParams.append("hash", options.hash);
                        request.searchParams.append("instance_key", "0");
                        request.searchParams.append("include_free_play_objectives", "true");
                        request.searchParams.append("timestamp", "0");
                        request.searchParams.append("request_id", "0");
                        request.searchParams.append("language_id", IdleChampionsApi.LANGUAGE_ID);
                        request.searchParams.append("network_id", IdleChampionsApi.NETWORK_ID);
                        request.searchParams.append("mobile_client_version", IdleChampionsApi.CLIENT_VERSION);
                        request.searchParams.append("localization_aware", "true");
                        return [4, fetch(request.toString())];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3, 3];
                        return [4, response.json()];
                    case 2:
                        playerData = _a.sent();
                        if (playerData.success) {
                            return [2, playerData];
                        }
                        _a.label = 3;
                    case 3: return [2, undefined];
                }
            });
        });
    };
    IdleChampionsApi.openChests = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response, openGenericChestResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = new URL(options.server);
                        request.searchParams.append("call", "openGenericChest");
                        request.searchParams.append("user_id", options.user_id);
                        request.searchParams.append("hash", options.hash);
                        request.searchParams.append("chest_type_id", options.chestTypeId.toString());
                        request.searchParams.append("count", options.count.toString());
                        request.searchParams.append("instance_id", options.instanceId);
                        request.searchParams.append("gold_per_second", "0.00");
                        request.searchParams.append("game_instance_id", "1");
                        request.searchParams.append("checksum", "d99242bc7924646a5e069bc39eeb735b");
                        request.searchParams.append("timestamp", "0");
                        request.searchParams.append("request_id", "0");
                        request.searchParams.append("language_id", IdleChampionsApi.LANGUAGE_ID);
                        request.searchParams.append("network_id", IdleChampionsApi.NETWORK_ID);
                        request.searchParams.append("localization_aware", "true");
                        return [4, fetch(request.toString())];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3, 3];
                        return [4, response.json()];
                    case 2:
                        openGenericChestResponse = _a.sent();
                        console.debug(openGenericChestResponse);
                        if (openGenericChestResponse.success) {
                            return [2, new OpenChestResponse(ResponseStatus.Success, openGenericChestResponse.loot_details)];
                        }
                        if (openGenericChestResponse.failure_reason == "Outdated instance id") {
                            return [2, new OpenChestResponse(ResponseStatus.OutdatedInstanceId)];
                        }
                        _a.label = 3;
                    case 3: return [2, new OpenChestResponse(ResponseStatus.Failed)];
                }
            });
        });
    };
    IdleChampionsApi.purchaseChests = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response, purchaseResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = new URL(options.server);
                        if (options.count > 100)
                            throw new Error("Limited to 100 chests purchased per call.");
                        request.searchParams.append("call", "buysoftcurrencychest");
                        request.searchParams.append("user_id", options.user_id);
                        request.searchParams.append("hash", options.hash);
                        request.searchParams.append("chest_type_id", options.chestTypeId.toString());
                        request.searchParams.append("count", options.count.toString());
                        request.searchParams.append("timestamp", "0");
                        request.searchParams.append("request_id", "0");
                        request.searchParams.append("network_id", IdleChampionsApi.NETWORK_ID);
                        request.searchParams.append("localization_aware", "true");
                        request.searchParams.append("mobile_client_version", "999");
                        request.searchParams.append("language_id", IdleChampionsApi.LANGUAGE_ID);
                        return [4, fetch(request.toString())];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3, 3];
                        return [4, response.json()];
                    case 2:
                        purchaseResponse = _a.sent();
                        console.debug(purchaseResponse);
                        if (purchaseResponse.success) {
                            return [2, ResponseStatus.Success];
                        }
                        if (purchaseResponse.failure_reason == "Not enough currency") {
                            return [2, ResponseStatus.InsuficcientCurrency];
                        }
                        _a.label = 3;
                    case 3: return [2, ResponseStatus.Failed];
                }
            });
        });
    };
    IdleChampionsApi.CLIENT_VERSION = "999";
    IdleChampionsApi.NETWORK_ID = "21";
    IdleChampionsApi.LANGUAGE_ID = "1";
    return IdleChampionsApi;
}());
document.addEventListener("DOMContentLoaded", loaded);
var REQUEST_DELAY = 4000;
var buyCountRange, buyCountNumber;
var openCountRange, openCountNumber;
var server;
var instanceId;
var userData;
var shownCloseClientWarning = false;
function loaded() {
    var _a, _b;
    document.getElementById("refreshInventory").addEventListener('click', refreshClick);
    document.getElementById("purchaseButton").addEventListener('click', purchaseClick);
    document.getElementById("openButton").addEventListener('click', openClick);
    (_a = document.getElementById("buyChestType")) === null || _a === void 0 ? void 0 : _a.addEventListener('change', setMaximumValues);
    (_b = document.getElementById("openChestType")) === null || _b === void 0 ? void 0 : _b.addEventListener('change', setMaximumValues);
    buyCountRange = document.getElementById("buyCountRange");
    buyCountNumber = document.getElementById("buyCountNumber");
    buyCountRange.oninput = buyRangeChanged;
    buyCountNumber.oninput = buyNumberChanged;
    openCountRange = document.getElementById("openCountRange");
    openCountNumber = document.getElementById("openCountNumber");
    openCountRange.oninput = openRangeChanged;
    openCountNumber.oninput = openNumberChanged;
}
function buyRangeChanged() {
    buyCountNumber.value = buyCountRange.value;
}
function buyNumberChanged() {
    if (parseInt(buyCountNumber.value) > parseInt(buyCountNumber.max)) {
        buyCountNumber.value = buyCountNumber.max;
    }
    buyCountRange.value = buyCountNumber.value;
}
function openRangeChanged() {
    openCountNumber.value = openCountRange.value;
}
function openNumberChanged() {
    if (parseInt(openCountNumber.value) > parseInt(openCountNumber.max)) {
        openCountNumber.value = openCountNumber.max;
    }
    openCountRange.value = openCountNumber.value;
}
function refreshClick() {
    hideMessages();
    chrome.storage.sync.get([Globals.SETTING_USER_ID, Globals.SETTING_USER_HASH], function (_a) {
        var userId = _a.userId, userHash = _a.userHash;
        refreshInventory(userId, userHash);
    });
}
function refreshInventory(userId, hash) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!userId || userId.length == 0 || !hash || hash.length == 0) {
                        console.error("No credentials entered.");
                        showError("No credentials entered.");
                        return [2];
                    }
                    if (!!server) return [3, 2];
                    return [4, IdleChampionsApi.getServer()];
                case 1:
                    server = _d.sent();
                    console.log("Got server " + server);
                    _d.label = 2;
                case 2:
                    if (!server) {
                        showError("Failed to get idle champions server.");
                        console.error("Failed to get idle champions server.");
                        return [2];
                    }
                    return [4, IdleChampionsApi.getUserDetails({
                            server: server,
                            user_id: userId,
                            hash: hash
                        })];
                case 3:
                    userData = _d.sent();
                    if (!userData) {
                        showError("Failed to retreive user data.");
                        console.error("Failed to retreive user data.");
                        return [2];
                    }
                    console.log("Refreshed inventory data.");
                    console.debug(userData);
                    instanceId = userData.details.instance_id;
                    chrome.storage.sync.set((_c = {}, _c[Globals.SETTING_INSTANCE_ID] = userData.details.instance_id, _c));
                    document.getElementById("gemCount").textContent = userData.details.red_rubies.toLocaleString();
                    document.getElementById("silverChestCount").textContent = ((_a = userData.details.chests[1]) === null || _a === void 0 ? void 0 : _a.toLocaleString()) || "";
                    document.getElementById("goldChestCount").textContent = ((_b = userData.details.chests[2]) === null || _b === void 0 ? void 0 : _b.toLocaleString()) || "";
                    setMaximumValues();
                    document.getElementById("actionTabs").classList.add("show");
                    return [2];
            }
        });
    });
}
function setMaximumValues() {
    if (!userData)
        return;
    var gems = userData.details.red_rubies;
    var silverChests = userData.details.chests[1] || 0;
    var goldChests = userData.details.chests[2] || 0;
    var buyMax = 0;
    switch (document.getElementById("buyChestType").value) {
        case 1..toString():
            buyMax = Math.trunc(gems / 50);
            break;
        case 2..toString():
            buyMax = Math.trunc(gems / 500);
            break;
    }
    document.getElementById("buyCountRange").max = buyMax.toString();
    document.getElementById("buyCountRange").value = buyMax.toString();
    document.getElementById("buyCountNumber").max = buyMax.toString();
    document.getElementById("buyCountNumber").value = buyMax.toString();
    var openMax = 0;
    switch (document.getElementById("openChestType").value) {
        case 1..toString():
            openMax = silverChests;
            break;
        case 2..toString():
            openMax = goldChests;
            break;
    }
    document.getElementById("openCountRange").max = openMax.toString();
    document.getElementById("openCountRange").value = openMax.toString();
    document.getElementById("openCountNumber").max = openMax.toString();
    document.getElementById("openCountNumber").value = openMax.toString();
}
function purchaseClick() {
    hideMessages();
    chrome.storage.sync.get([Globals.SETTING_USER_ID, Globals.SETTING_USER_HASH], function (_a) {
        var userId = _a.userId, userHash = _a.userHash;
        purchaseChests(userId, userHash);
    });
}
function purchaseChests(userId, hash) {
    return __awaiter(this, void 0, void 0, function () {
        var MAX_PURCHASE_AMOUNT, chestType, chestAmount, remainingChests, currentAmount, responseStatus;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!server)
                        return [2];
                    MAX_PURCHASE_AMOUNT = 100;
                    chestType = document.getElementById("buyChestType").value;
                    chestAmount = parseInt(document.getElementById("buyCountRange").value) || 0;
                    if (!chestType || chestAmount < 1) {
                        return [2];
                    }
                    remainingChests = chestAmount;
                    _a.label = 1;
                case 1:
                    if (!(remainingChests > 0)) return [3, 5];
                    showInfo("Purchasing... " + remainingChests + " chests remaining to purchase");
                    currentAmount = remainingChests > MAX_PURCHASE_AMOUNT ? MAX_PURCHASE_AMOUNT : remainingChests;
                    remainingChests -= currentAmount;
                    console.log("Purchasing " + currentAmount + " chests");
                    return [4, IdleChampionsApi.purchaseChests({
                            server: server,
                            user_id: userId,
                            hash: hash,
                            chestTypeId: chestType,
                            count: currentAmount
                        })];
                case 2:
                    responseStatus = _a.sent();
                    if (responseStatus == ResponseStatus.InsuficcientCurrency) {
                        console.error("Insufficient currency error");
                        showError("Insufficient gems remaining");
                        return [2];
                    }
                    else if (responseStatus == ResponseStatus.Failed) {
                        console.error("Purchase API call failed");
                        showError("Purchase failed");
                        return [2];
                    }
                    if (!(remainingChests > 0)) return [3, 4];
                    return [4, new Promise(function (h) { return setTimeout(h, REQUEST_DELAY); })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3, 1];
                case 5:
                    console.log("Completed purchase");
                    refreshInventory(userId, hash);
                    showSuccess("Purchased " + chestAmount + " chests");
                    return [2];
            }
        });
    });
}
function openClick() {
    hideMessages();
    chrome.storage.sync.get([Globals.SETTING_USER_ID, Globals.SETTING_USER_HASH], function (_a) {
        var userId = _a.userId, userHash = _a.userHash;
        openChests(userId, userHash);
    });
}
function openChests(userId, hash) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var MAX_OPEN_AMOUNT, lootResults, chestType, chestAmount, remainingChests, currentAmount, openResponse, lastInstanceId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    MAX_OPEN_AMOUNT = 50;
                    if (!server || !instanceId)
                        return [2];
                    if (!shownCloseClientWarning) {
                        showOpenWarning("You MUST close the client before calling open chests. Click open again to confirm.");
                        shownCloseClientWarning = true;
                        return [2];
                    }
                    shownCloseClientWarning = false;
                    lootResults = new LootAggregateResult();
                    chestType = document.getElementById("openChestType").value;
                    chestAmount = parseInt(document.getElementById("openCountRange").value) || 0;
                    if (!chestType || chestAmount < 1) {
                        return [2];
                    }
                    remainingChests = chestAmount;
                    _b.label = 1;
                case 1:
                    if (!(remainingChests > 0)) return [3, 5];
                    showInfo("Opening... " + remainingChests + " chests remaining to open");
                    currentAmount = remainingChests > MAX_OPEN_AMOUNT ? MAX_OPEN_AMOUNT : remainingChests;
                    remainingChests -= currentAmount;
                    console.log("Opening " + currentAmount + " chests");
                    return [4, IdleChampionsApi.openChests({
                            server: server,
                            user_id: userId,
                            hash: hash,
                            chestTypeId: chestType,
                            count: currentAmount,
                            instanceId: instanceId
                        })];
                case 2:
                    openResponse = _b.sent();
                    if (openResponse.status == ResponseStatus.OutdatedInstanceId) {
                        lastInstanceId = instanceId;
                        console.log("Refreshing inventory for instance ID");
                        refreshInventory(userId, hash);
                        if (instanceId == lastInstanceId) {
                            console.error("Failed to refresh instance id");
                            showError("Failed to get updated instance ID. Check credentials.");
                            return [2];
                        }
                        remainingChests += currentAmount;
                    }
                    else if (openResponse.status == ResponseStatus.Failed) {
                        console.error("Purchase API call failed");
                        showError("Purchase failed");
                        return [2];
                    }
                    aggregateResults((_a = openResponse.lootDetail) !== null && _a !== void 0 ? _a : [], lootResults);
                    displayLootResults(lootResults);
                    if (!(remainingChests > 0)) return [3, 4];
                    return [4, new Promise(function (h) { return setTimeout(h, REQUEST_DELAY); })];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4: return [3, 1];
                case 5:
                    console.log("Completed opening");
                    refreshInventory(userId, hash);
                    showSuccess("Opened " + chestAmount + " chests");
                    return [2];
            }
        });
    });
}
function hideMessages() {
    document.getElementById("error").classList.remove("show");
    document.getElementById("openWarning").classList.remove("show");
    document.getElementById("success").classList.remove("show");
    document.getElementById("info").classList.remove("show");
}
function showError(text) {
    hideMessages();
    document.getElementById("error").classList.add("show");
    document.querySelector("#error span").innerHTML = text;
}
function showOpenWarning(text) {
    hideMessages();
    document.getElementById("openWarning").classList.add("show");
    document.querySelector("#openWarning span").innerHTML = text;
}
function showInfo(text) {
    hideMessages();
    document.getElementById("info").classList.add("show");
    document.querySelector("#info span").innerHTML = text;
}
function showSuccess(text) {
    hideMessages();
    document.getElementById("success").classList.add("show");
    document.querySelector("#success span").innerHTML = text;
}
var LootAggregateResult = (function () {
    function LootAggregateResult() {
        this.shinies = 0;
        this.commonBounties = 0;
        this.uncommonBounties = 0;
        this.rareBounties = 0;
        this.epicBounties = 0;
        this.commonBlacksmith = 0;
        this.uncommonBlacksmith = 0;
        this.rareBlacksmith = 0;
        this.epicBlacksmith = 0;
    }
    return LootAggregateResult;
}());
function aggregateResults(loot, aggregateResult) {
    aggregateResult.shinies += loot.filter(function (l) { return l.gilded; }).length;
    aggregateResult.commonBounties += loot.filter(function (l) { return l.add_inventory_buff_id == 17; }).length;
    aggregateResult.uncommonBounties += loot.filter(function (l) { return l.add_inventory_buff_id == 18; }).length;
    aggregateResult.rareBounties += loot.filter(function (l) { return l.add_inventory_buff_id == 19; }).length;
    aggregateResult.epicBounties += loot.filter(function (l) { return l.add_inventory_buff_id == 20; }).length;
    aggregateResult.commonBlacksmith += loot.filter(function (l) { return l.add_inventory_buff_id == 31; }).length;
    aggregateResult.uncommonBlacksmith += loot.filter(function (l) { return l.add_inventory_buff_id == 32; }).length;
    aggregateResult.rareBlacksmith += loot.filter(function (l) { return l.add_inventory_buff_id == 33; }).length;
    aggregateResult.epicBlacksmith += loot.filter(function (l) { return l.add_inventory_buff_id == 34; }).length;
}
function displayLootResults(aggregateResult) {
    document.querySelector("#chestLoot tbody").innerHTML = "";
    addTableRow("Shinies", aggregateResult.shinies);
    addTableRow("Tiny Bounty Contract", aggregateResult.commonBounties, "rarity-common");
    addTableRow("Small Bounty Contract", aggregateResult.uncommonBounties, "rarity-uncommon");
    addTableRow("Medium Bounty Contract", aggregateResult.rareBounties, "rarity-rare");
    addTableRow("Large Bounty Contract", aggregateResult.epicBounties, "rarity-epic");
    addTableRow("Tiny Blacksmithing Contract", aggregateResult.commonBlacksmith, "rarity-common");
    addTableRow("Small Blacksmithing Contract", aggregateResult.uncommonBlacksmith, "rarity-uncommon");
    addTableRow("Medium Blacksmithing Contract", aggregateResult.rareBlacksmith, "rarity-rare");
    addTableRow("Large Blacksmithing Contract", aggregateResult.epicBlacksmith, "rarity-epic");
}
function addTableRow(text, amount, style) {
    if (amount == 0)
        return;
    var tbody = document.querySelector("#chestLoot tbody");
    tbody.append(buildTableRow(text, amount, style));
}
function buildTableRow(label, amount, style) {
    var labelColumn = document.createElement("td");
    labelColumn.innerText = label;
    var amountColumn = document.createElement("td");
    amountColumn.innerText = amount.toString();
    var row = document.createElement("tr");
    if (style) {
        row.classList.add(style);
    }
    row.appendChild(labelColumn);
    row.appendChild(amountColumn);
    return row;
}
