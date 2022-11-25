/**
 * Interface for algorithms to be benchmarked.
 */
public interface BenchmarkAlgo {
	/**
	 * Parses the algorithms input arguments if any. Arguments are supplied by the tester.
	 * @param args variable amount of arguments.
	 */
	void parseArguments(Object... args);
	
	/**
	 * Useful the algorithm has some initial overhead (eg. declaration of a for loop).
	 * Runs code that generates such overhead.
	 */
	default void runSetup() { };
	
	/**
	 * Runs the algorithm.
	 */
	void runAlgorithm();
}
