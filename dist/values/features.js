"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureDisplayNames = exports.Feature = void 0;
var Feature;
(function (Feature) {
    Feature["RPM"] = "rpm";
    Feature["ENERGY"] = "energyRating";
    Feature["FASTEST"] = "fastestProgram";
    Feature["CAPACITY"] = "capacity";
})(Feature || (exports.Feature = Feature = {}));
exports.FeatureDisplayNames = {
    [Feature.RPM]: "RPM",
    [Feature.ENERGY]: "Energy Rating",
    [Feature.FASTEST]: "Fastest Program",
    [Feature.CAPACITY]: "Capacity"
};
