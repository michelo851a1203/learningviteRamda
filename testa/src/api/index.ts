import { TestSampleListType, TestSampleType } from "../datatype";

export default function TestSampleApi() {

  const getTestSampleListService = async (): Promise<TestSampleListType> => {
    const url = 'http://localhost:8081'
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
    if (response.status !== 200) {
      throw 'not 200';
    }
    return <TestSampleListType>(await response.json());
  }

  const getTestSampleDetailService = async (name: string): Promise<TestSampleType> => {
    const url = `http://localhost:8081/detail/${name}`
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
    if (response.status !== 302) {
      throw 'not 302';
    }
    return <TestSampleType>(await response.json());
  }

  return {
    getTestSampleListService,
    getTestSampleDetailService,
  }
}
