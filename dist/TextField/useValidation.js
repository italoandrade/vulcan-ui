import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { useState } from 'react';
import { useDeepCompareEffect } from '../index';

function checkValue(value) {
  return typeof value !== 'undefined' && value !== null && value !== '';
}

function useValidation(value, validation) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      hasError = _useState2[0],
      setHasError = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      errorText = _useState4[0],
      setErrorMessage = _useState4[1];

  var setCustomErrorMessage = function setCustomErrorMessage(errorMessage) {
    setHasError(!!errorMessage);
    setErrorMessage(errorMessage);
  };

  var validate = function validate() {
    setHasError(false);
    setErrorMessage(null);

    if (validation) {
      if (validation.required) {
        if (!checkValue(value)) {
          setHasError(true);
          setErrorMessage(validation.required.message || validation.required);
          return;
        }
      }

      if (validation.maxLength) {
        var maxLength = {};
        maxLength.length = validation.maxLength.length || validation.maxLength;
        maxLength.message = validation.maxLength.message || "".concat(value.length, "/").concat(maxLength.length);

        if (!checkValue(value) || value.length > maxLength.length) {
          setHasError(true);
          setErrorMessage(maxLength.message);
          return;
        }
      }

      if (validation.minLength) {
        var minLength = {};
        minLength.length = validation.minLength.length || validation.minLength;
        minLength.message = validation.minLength.message;

        if (!checkValue(value) || value.length < minLength.length) {
          setHasError(true);
          setErrorMessage(minLength.message);
          return;
        }
      }

      if (validation.minAmount) {
        var minAmount = {};
        minAmount.amount = validation.minAmount.amount || validation.minAmount;
        minAmount.message = validation.minAmount.message;

        if (!checkValue(value) || parseFloat(value) < minAmount.amount) {
          setHasError(true);
          setErrorMessage(minAmount.message);
          return;
        }
      }

      if (validation.maxAmount) {
        var maxAmount = {};
        maxAmount.amount = validation.maxAmount.amount || validation.maxAmount;
        maxAmount.message = validation.maxAmount.message;

        if (!checkValue(value) || parseFloat(value) > maxAmount.amount) {
          setHasError(true);
          setErrorMessage(maxAmount.message);
          return;
        }
      }

      if (validation.regexExpression) {
        var regexExpression = {};
        regexExpression.value = validation.regexExpression.value || validation.regexExpression;
        regexExpression.message = validation.regexExpression.message;
        var condition = new RegExp(regexExpression.value, 'g');

        if (!condition.test(value)) {
          setHasError(true);
          setErrorMessage(regexExpression.message);
          return;
        }
      }
    }
  };

  useDeepCompareEffect(function () {
    validate(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validation, value]);
  return [hasError, errorText, setCustomErrorMessage, validate];
}

export default useValidation;