package Benchmark;

import InputGenerator.Input;

import java.util.Arrays;

/**
 * Runs and measures code executions for one input on one algorithm.
 */
public class Benchmark {
	
	private final BenchmarkAlgo algo;
	private Input<Object[]> input;
	private int warmupRuns;
	private int actualRuns;
	
	
	/**
	 * Constructor for Benchmark.Benchmark object.
	 * @param algo the algorithm to measure.
	 * @param input the input to be supplied to the benchmarked algorithm.
	 * @param warmupRuns how many unmeasured runs to perform. Useful for warming up the cache.
	 * @param actualRuns how many actual measured runs to perform.
	 */
	public Benchmark(BenchmarkAlgo algo, Input input, int warmupRuns, int actualRuns) {
		this.algo =algo;
		this.input=input;
		this.warmupRuns = warmupRuns;
		this.actualRuns = actualRuns; // remove
		// this.iterations = iterations;
		// just to follow the notation defined in the slides
	}
	
	/**
	 * Runs the benchmark on the chosen algorithm.
	 * @return the measured benchmark results.
	 */
	public BenchmarkResults runBenchmark() {
		BenchmarkResults results = new BenchmarkResults(algo,input);
		Object[] newinput;
		
		long startTime, endTime, setupTime;
		for (int i = 0; i < warmupRuns+actualRuns; i++) { // i < iterations; // since the global number iterations includes the warmupRuns (iterations = warmupRuns + actualRuns)
			// Creates new fresh copy of the input set
			
			newinput = Arrays.copyOf(input.value, input.value.length);
			
			// 1. The algorithm parses the input set.
			algo.parseArguments((Object) newinput);
			// 2. The algorithms setup time is measured.
			startTime = System.nanoTime();
			algo.runSetup();
			setupTime = System.nanoTime();
			setupTime -= startTime;
			// 3. The algorithms execution type is measured.
			startTime = System.nanoTime();
			algo.runAlgorithm();
			endTime = System.nanoTime();
			//

			if(i<warmupRuns)
				results.addWarmupResult(endTime-startTime-setupTime);
			else
				results.addResult(endTime-startTime-setupTime);
		}
		return results;
	}
}
