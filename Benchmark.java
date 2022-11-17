import java.util.Arrays;

/**
 * Runs all the algorithms with one set of inputs.
 */
public class Benchmark {
	
	private final Sorter algo;
	private Integer[] input;
	private int warmupRuns;
	private int actualRuns;
	
	
	public Benchmark(Sorter algo, Integer[] input, int warmupRuns, int actualRuns){
		this.algo =algo;
		this.input=input;
		this.warmupRuns = warmupRuns;
		this.actualRuns = actualRuns;
	}
	
	public BenchmarkResults runBenchmark() {
		BenchmarkResults results = new BenchmarkResults(algo.getClass());
		Integer[] newinput;
		for (int i = 0; i < warmupRuns+actualRuns; i++) {
			newinput = Arrays.copyOf(input, input.length);
			
			long startTime = System.nanoTime();
			algo.sort(newinput);
			long endTime = System.nanoTime();
			
			if(i<warmupRuns)
				results.addWarmupResult(endTime-startTime);
			else
				results.addResult(endTime-startTime);
		}
		return results;
	}
}
