public class Experiment {
	
	
	public static void main(String[] args){
		
		// initialize array
		// set Independent Variables
		
		Sorter[] algos={new BubbleSortUntilNoChange<Integer>(), new BubbleSortUntilNoChange(), new BubbleSortWhileNeeded()};
		Integer[] myArray={20, 15, 10};
		
		BenchmarkResults r1 = new Benchmark(algos[1], myArray, 7,100).runBenchmark();
		
		System.out.println(
				"===\n"+
				"Algorithm: "+r1.getAlgorithm()+"\n"+
				"AVG Time : "+r1.getAverageResult());
	}
}
