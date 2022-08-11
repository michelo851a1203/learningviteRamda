import { defineStore } from "pinia";
import { curry } from "ramda";
import TestSampleApi from "../api";
import { TestSampleListType, TestSampleType } from "../datatype";

export const useTestSampleStore = defineStore('testSample', {
  actions: {
    async integrateGetTestSampleListHandler() {
      return this.getTestSampleListHandler(this.getTestSampleListApi);
    },
    async getTestSampleListHandler(
      _getTestSampleListApi: () => Promise<TestSampleListType>, 
    ) {
      try {
        const testSampleListResult  = await curry(_getTestSampleListApi)();
        return testSampleListResult;
      } catch (error) {
        console.log("this is error from store : ", error);
      }
    },
    getTestSampleListApi() {
      const testApi = TestSampleApi();
      return testApi.getTestSampleListService();
    },
    async integrateGetTestSampleDetailHandler(name: string) {
      return this.getTestSampleDetailHandler(this.getTestSampleDetailApi, name);
    },
    async getTestSampleDetailHandler(
      _getTestSampleDetailApi: (name: string) => Promise<TestSampleType>, 
      name: string,
    ) {
      try {
        const testSampleResult  = await curry(_getTestSampleDetailApi)(name);
        return testSampleResult;
      } catch (error) {
        console.log("this is error from store : ", error);
      }
    },
    async getTestSampleDetailApi(name: string) {
      const testApi = TestSampleApi();
      return testApi.getTestSampleDetailService(name);
    },
  }
});
