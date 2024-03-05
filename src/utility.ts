import { TFilterClause, TQueryParams, TQuestions, TResponse, TWholeResponse } from "@/types";

const doesQuestionPassFilter = (question: TQuestions, filter: TFilterClause): boolean => {
  const compare = (questionValue: Date | number | string, filterValue: Date | number | string, operation: string) => {
    if (operation === 'does_not_equal') {
      return questionValue !== filterValue;
    } else if (operation === 'greater_than') {
      return questionValue > filterValue;
    } else if (operation === 'less_than') {
      return questionValue < filterValue;
    } else {
      return questionValue === filterValue;
    }
  }
  
  if (question.type === "DatePicker") {
    const filterValue = new Date(filter.value).getTime();
    const questionValue = new Date(question.value).getTime();
    return compare(questionValue, filterValue, filter.condition);
  } else if (question.type === "NumberInput") {
    const filterValue = Number(filter.value);
    const questionValue = Number(question.value);
    return compare(questionValue, filterValue, filter.condition);
  } else { //string
    return compare(question.value, filter.value, filter.condition);
  }
}

//filter
const applyFilter = (responses: TResponse[], filters: string): TResponse[] => {
  const filterArr = filters.split('AND');
  const filterObjArr: TFilterClause[] = [];
  filterArr.forEach(filter => {
    if (filter.includes('equals')) {
      const filterInfoArr = filter.split('equals');
      filterObjArr.push({id: filterInfoArr[0], condition: 'equals', value: filterInfoArr[1]});
    }  else if (filter.includes('greater_than')){
      const filterInfoArr = filter.split('greater_than');
      filterObjArr.push({id: filterInfoArr[0], condition: 'greater_than', value: filterInfoArr[1]});
    } else if (filter.includes('less_than')){
      const filterInfoArr = filter.split('less_than');
      filterObjArr.push({id: filterInfoArr[0], condition: 'less_than', value: filterInfoArr[1]});
    } else {
      const filterInfoArr = filter.split('does_not_equals');
      filterObjArr.push({id: filterInfoArr[0], condition: 'does_not_equal', value: filterInfoArr[1]});
    }
  })
  // question response types: LongAnswer, MultipleChoice, ShortAnswer, EmailInput, DatePicker, NumberInput,
  return responses.filter(response => {
    let filterCheckPassed = true;
    response.questions.forEach(question => {
      const filterToApply = filterObjArr.find(filter => question.id === filter.id);
      if (filterToApply && filterCheckPassed) {
        filterCheckPassed = doesQuestionPassFilter(question, filterToApply);
      }
    })
    return filterCheckPassed;
  })
};

const applyOffset = (responses: TResponse[], offset: number) => {
  return responses.slice(offset);
}

const applyLimit = (responses: TResponse[], limit: number = 150) => {
  return responses.slice(0, limit);
}

// get responses before beforeDate and after afterDate
const applyDateRange = (responses: TResponse[], beforeDate: string = '', afterDate: string = '') => {
  return responses.filter(response => {
    const submissionTime = new Date(response.submissionTime).getTime();
    if (beforeDate && afterDate) {
      const bDate = new Date(beforeDate).getTime();
      const aDate = new Date(afterDate).getTime();
      return submissionTime < bDate && submissionTime > aDate;
    }
    if (beforeDate) {
      const bDate = new Date(beforeDate).getTime()
      return submissionTime < bDate;
    }
    if (afterDate) {
      const aDate = new Date(afterDate).getTime();
      return submissionTime > aDate;
    }
  })
}

// assumig asc sort returns oldest first and desc returns newest first
const applySort = (responses: TResponse[], sort: string = 'asc') => {
  if (sort === 'desc') {
    return responses.sort((a, b) => {
      const aSubmissionTime = new Date(a.submissionTime).getTime();
      const bSubmissionTime = new Date(b.submissionTime).getTime();
      if (aSubmissionTime - bSubmissionTime < 0) {
        return 1;
      } else {
        return -1;
      }
    });
  } else {
    return responses.sort((a, b) => {
      const aSubmissionTime = new Date(a.submissionTime).getTime();
      const bSubmissionTime = new Date(b.submissionTime).getTime();
      if (aSubmissionTime - bSubmissionTime < 0) {
        return -1;
      } else {
        return 1;
      }
    });
  }
}

const applyEditLink = (responses: TResponse[]) => {
  return responses.map(response => ({...response, editLink: '/edit-link'}));
};

export const applyQueryParams = (responses: TResponse[], queryParams: TQueryParams): TWholeResponse => {
  let filteredResponses: TResponse[] = [...responses];
  const { sort, afterDate, beforeDate, filters, offset, limit, includeEditLink } = queryParams;
  // sort
  filteredResponses = applySort(filteredResponses, sort);
  // dates
  if (afterDate || beforeDate) {
    filteredResponses = applyDateRange(filteredResponses, beforeDate, afterDate);
  }
  // filters
  if (filters) {
    filteredResponses = applyFilter(filteredResponses, filters);
  }
  // offset
  if (offset) {
    filteredResponses = applyOffset(filteredResponses, offset);
  }
  // limit
  filteredResponses = applyLimit(filteredResponses, Number(limit));
  // includeEditLink
  if (includeEditLink) {
    filteredResponses = applyEditLink(filteredResponses);
  }
  // getTotalResponses
  const totalResponses = filteredResponses.length;
  // getPageCount
  const pageCount = totalResponses / (limit ?? 150);
  // return results
  return {responses: filteredResponses, pageCount, totalResponses};
};