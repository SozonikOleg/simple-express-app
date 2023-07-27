import { ResolutionType } from "../types/ResolutionType";
import Validator from "./validator";

const fieldExist = (value: any): boolean => value !== undefined;
const isString = (value: any): boolean => typeof value === "string";
const isBoolean = (value: any): boolean => typeof value === "boolean";
const isNull = (value: any): boolean => typeof value === null;
const isNumber = (value: any): boolean => ((typeof value === "number") && !isNaN(value));
const isInteger = (value: any): boolean => (isNumber(value) && Number.isInteger(value));
const isISODate = (str: string): boolean => {
    const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[-+]\d{2}:\d{2})$/;
    return isoDatePattern.test(str);
};

const validator = new Validator();
const videoValidator = validator
    .add("title", (title) => fieldExist(title), "title not exist")
    .add("title", (title) => isString(title), "title not a string")
    .add("title", (title) => title.trim() !== '', "title is empty string")
    .add("title", (title) => title.length < 40, "title length more then 40")
    .add("author", (author) => fieldExist(author), "title not exist")
    .add("author", (author) => isString(author), "title not a string")
    .add("author", (author) => author.trim() !== '', "author is empty string")
    .add("author", (author) => author.length < 20, "author length more then 20")
    .add("availableResolutions",
        (resolutions) => (
            !fieldExist(resolutions) || isNull(resolutions) || (Array.isArray(resolutions))
        ),
        "invalid type of resolution")
    .add("availableResolutions",
        (resolutions) => (
            !fieldExist(resolutions) || isNull(resolutions) ||
            (Array.isArray(resolutions) && (resolutions.every((resol) => resol in ResolutionType)))
        ),
        "invalid type into array avalibleResolutions")
    .add("canBeDownloaded",
        (isDownloaded) => (!fieldExist(isDownloaded) || isBoolean(isDownloaded)),
        "canBeDownloaded is not boolean")
    .add("minAgeRestriction",
        (minAge) => (!fieldExist(minAge) || isNull(minAge) || isInteger(minAge)),
        "incorrect type of minAgeRestriction")
    .add("minAgeRestriction",
        (minAge) => (!fieldExist(minAge) || isNull(minAge) || (isInteger(minAge) && (1 <= minAge && minAge <= 18))),
        "minAgeRestriction out of range [1, 18]")
    .add("publicationDate", (date) => !fieldExist(date) || isString(date), "publicationDate not a string")
    .add("publicationDate", (date) => !fieldExist(date) || (isString(date) && isISODate(date)), "invalid publicationDate");


export default videoValidator;