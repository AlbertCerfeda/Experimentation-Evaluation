import java.io.IOException;

public class Experiment {
	
	
	public static void main(String[] args) throws IOException{
		
		// Sets up the algorithms to use
		BenchmarkAlgo[] algos = {
				new BubbleSortUntilNoChange<Integer>(Integer.class),
				new BubbleSortPassPerItem<Integer>(Integer.class),
				new BubbleSortWhileNeeded<Integer>(Integer.class)
		};
		
		// Sets up the input generates and retrieves the set of inputs.
		InputGenerator generator = new InputGenerator();
		generator.generateInputs();
		
		// Sets up the CSV logger
		CSVBenchmark csv = new CSVBenchmark("results.csv",false);
		
		BenchmarkResults r1;
		// Every input
		for(Input<Integer[]> input : generator.getInputs())
			// Every algorithm
			for (BenchmarkAlgo algo : algos) {
				r1 = new Benchmark(algo, input, 1000,100000).runBenchmark();
				System.out.println(r1.toString());
				// Logs to CSV
				csv.append(r1);
			}
		csv.save();
	}
}
