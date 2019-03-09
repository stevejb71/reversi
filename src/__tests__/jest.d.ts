declare namespace jest {
  interface Matchers<R> {
    toEqualSet<A>(expected: Set<A>): CustomMatcherResult;
  }
}