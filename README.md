# 파이브 라인스 오브 코드

[![Five Lines of Code](images/frontpage.png)](https://www.manning.com/books/five-lines-of-code)


[파이브 라인스 오브 코드](https://wikibook.co.kr/five-lines/) 스터디에 진행하기 전 아래 방법을 꼭 읽어주세요.

## 스터디 진행 방법
### 스터디 목적

- 다섯 줄 제한 규칙으로 리팩터링 기법을 의도적으로 수련합니다.

### 프로젝트 참여 방법
- 해당 프로젝트를 Fork 받는 방법은 [Git Repository를 Fork 하는 방법](https://github.com/jihwooon/Five-Lines-Study/issues/1)를 참고하시면 됩니다.
- PR 요청 방법은 [PR를 통해 요청하는 방법](https://github.com/jihwooon/Five-Lines-Study/issues/2)를 참고하시면 됩니다.
- Git 방법은 [Git 스타일 가이드](https://github.com/ikaruce/git-style-guide)를 참조하시면 됩니다.

### Pull Request 규칙
- 반드시 main 브랜치에서 작업하지 않습니다.
    - 새로운 브랜치를 생성 후 그 위에서 작업합니다. 
- PR 요청하기 전 fetch와 rebase를 먼저 동기화를 해주세요.
    - `git fetch upstream main`
    - `git rebase upstream/main`
- 커밋 단위는 의미 단위로 쪼개주세요.
    - 수정과 리팩터링 2개 작업은 반드시 각 한 커밋으로 나눠서 올립니다.
- 커밋 그래프는 최대한 단순하게 가져갑니다
    - Git-flow 전략이 아닌 [트렁크 기반 개발](https://www.atlassian.com/ko/continuous-delivery/continuous-integration/trunk-based-development)을 사용합니다.
- 마지막 줄 공백 규칙을 따릅니다.
    - 파일 끝에 빈 줄을 추가함으로써 변경 사항을 올바르게 감지 할 수 있어 공백 규칙을 적용합니다.

### 프로젝트 실행 방법

1. 패키지는 npm에 있습니다. 패키지를 실행하려면 다음 명령을 실행합니다.

```shell
npm install # npm 패키지 설치
npm start # node 실행
```

2. 게임을 실행하려면 index.html를 엽니다.

```shell
open index.html
```
